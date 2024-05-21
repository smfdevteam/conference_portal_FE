import { Input, Button, Image } from "@nextui-org/react";
import { EyeFilledIcon } from "../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Icons/EyeSlashFilledIcon";
import logo from "/smf.png";
import { useState, useContext } from "react";
import { login } from "../../Api/api";
import { stateProvider } from "../../Context/App_Context";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};
const onSubmit = async ({
  email,
  password,
  setIsSubmiting,
  setAppState,
  setErrorMessage,
}) => {
  try {
    setIsSubmiting(true);
    const response = await login({
      email: email,
      password: password,
    });
    if (response.status === 200) {
      localStorage.setItem("X-ACCESS-TOKEN", response.headers.get("Token"));
      localStorage.setItem("X-REFRESH-TOKEN", response.headers.get("Refresh"));
      setAppState((prev) => {
        return { ...prev, user: response.data };
      });
    } else {
      throw new Error(response);
    }
  } catch (error) {
    console.log("errror==========", error);
    setErrorMessage("error");
  } finally {
    setIsSubmiting(false);
  }
};
const validationSchema = Yup.object({
  email: Yup.string().email("الايميل مش مظبوط").required("الايميل مطلوب"),
  password: Yup.string().required("الباسوورد مطلوب"),
});

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { app_state, setAppState } = useContext(stateProvider);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  formik.values.setIsSubmiting = setIsSubmiting;
  formik.values.setAppState = setAppState;
  formik.values.setErrorMessage = setErrorMessage;
  return (
    <div className="font-semibold font-[Cairo]">
      <form
        className="flex flex-col gap-8 justify-center items-center h-full"
        onSubmit={formik.handleSubmit}
      >
        <Image
          width={100}
          src={logo}
          alt="NextUI Album Cover"
          className="animate-pulse"
        />
        <h1>يلا اعمل حساب</h1>
        {errorMessage ? (
          <div className="text-red-800  border-2 border-red-600 w-full text-center rounded-md animate-bounce">
            <h2>{errorMessage}</h2>
          </div>
        ) : null}
        <Input
          name="email"
          type="email"
          variant="bordered"
          label="الايميل"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={
            formik.touched.email && (formik.errors.email ? true : false)
          }
          errorMessage={formik.errors.email}
        />
        <Input
          name="password"
          type={isVisible ? "text" : "password"}
          variant="bordered"
          label="الباسوورد"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeFilledIcon className="text-2xl text-primary pointer-events-none" />
              ) : (
                <EyeSlashFilledIcon className="text-2xl text-primary pointer-events-none" />
              )}
            </button>
          }
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={
            formik.touched.password && (formik.errors.password ? true : false)
          }
          errorMessage={formik.errors.password}
        />
        <Button
          color="primary"
          className="w-full"
          type="submit"
          isLoading={isSubmiting}
        >
          يلا بينا
        </Button>
      </form>
    </div>
  );
}
