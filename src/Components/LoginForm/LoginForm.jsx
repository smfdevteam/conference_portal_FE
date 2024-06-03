import { Input, Button, Image } from "@nextui-org/react";
import { EyeFilledIcon } from "../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Icons/EyeSlashFilledIcon";
import logo from "/smf.png";
import { useState, useContext } from "react";
import { login } from "../../Api/api";
import { stateProvider } from "../../Context/App_Context";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};
const onSubmit = async ({ email, password, setIsSubmiting, setAppState,navigate }) => {
  try {
    setIsSubmiting(true);
    const response = await login({
      email: email,
      password: password,
    });
    console.log("response = ===", response);
    if (response.status === 200) {
      localStorage.setItem("X-ACCESS-TOKEN", response.headers.get("Token"));
      localStorage.setItem("X-REFRESH-TOKEN", response.headers.get("Refresh"));
      console.log("data ====", response.data);
      setAppState((prev) => {
        return { ...prev, user: response.data, isLogged: true };
      });
      navigate('/')
      
    }
  } finally {
    setIsSubmiting(false);
  }
};
const validationSchema = Yup.object({
  email: Yup.string().email("الايميل مش مظبوط").required("الايميل مطلوب"),
  password: Yup.string().required("الباسوورد مطلوب"),
});

export default function LoginForm() {
  const navigate = useNavigate();
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
  formik.values.navigate = navigate;
  return (
    <div className="font-semibold font-[Cairo]">
      <div
        className="text-blue-600 border-2 w-fit rounded-md p-1 hover:bg-blue-600 hover:text-white duration-400"
        onClick={() => navigate("/register")}
      >
        <p>إنشاء حساب</p>
      </div>
      <form
        className="flex flex-col gap-4 justify-center items-center h-full"
        onSubmit={formik.handleSubmit}
      >
        <Image
          width={100}
          src={logo}
          alt="NextUI Album Cover"
          className="animate-pulse"
        />
        <h1>تسجيل الدخول</h1>

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

        <div
          className="w-full text-blue-600"
          onClick={() => navigate("/resetpassword")}
        >
          <p> نسيت كلمة المرور؟</p>
        </div>
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
