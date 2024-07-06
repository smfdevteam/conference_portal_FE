import { Input, Button, Image, Avatar } from "@nextui-org/react";
import { EyeFilledIcon } from "../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Icons/EyeSlashFilledIcon";
import logo from "/smf.png";
import { useState, useContext } from "react";
import { login } from "../../Api/auth.service";
import { stateProvider } from "../../Context/App_Context";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { getLookups } from "../../Api/conference_meta.service";
import { getMessagesCount } from "../../Api/user.service";
import SMF_Tech from '../../Components/SMF_Tech'
import GradientSvg from "../UserProfile/UserProfileAnimation/GradientSvg";
import toast from "react-hot-toast";
const initialValues = {
  email: "",
  password: "",
};


const onSubmit = async ({
  email,
  password,
  setIsSubmiting,
  setAppState,
  navigate,
}) => {
  const getLookUpsData = async () => {
    const lookups = await getLookups();
    setAppState((prev) => {
      return { ...prev, conference: { ...lookups } };
    });
  };

  const getUserMessagesCount = async () => {
    try {
      const count = await getMessagesCount();
      setAppState((prev) => ({ ...prev, user_messages: count }));
    } catch (e) {
      setAppState((prev) => ({ ...prev, user_messages: "?" }));
    }
  };

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

      getLookUpsData();
      getUserMessagesCount();
      setAppState((prev) => {
        return { ...prev, user: response.data, isLogged: true };
      });
      navigate("/");

    }

  }
  catch(e) {
    toast.error('حصل حاجة غلط | جرب تاني او ارجع ل SMF Tech.')
  }
  finally {
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
      <div className="absolute inset-0 rounded-md  ">
        <GradientSvg />
      </div>

      <form
        className=" flex flex-col gap-4 justify-center items-center h-full text-3xl "
        onSubmit={formik.handleSubmit}
      >
        <div>
          <Avatar
            isBordered
            imgProps={{
              style: {
                objectFit: "contain",
                width: "100%",
                height: "100%",
              },
            }}
            src={logo}
            className="bg-white w-32 h-32  md:w-64 md:h-64 "
          />
        </div>

        <h1>تسجيل الدخول</h1>

        <Input
          name="email"
          type="email"
          variant="bordered"
          label="الايميل"
          radius="full"
          color="primary"
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
          radius="full"
          color="primary"
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
          className="w-full text-blue-600 z-10"
          onClick={() => navigate("/resetpassword")}
        >
          <p> نسيت كلمة المرور؟</p>
        </div>
        <Button
          color="primary"
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600"
          type="submit"
          isLoading={isSubmiting}
        >
          يلا بينا
        </Button>
        <Button
          color="primary"
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600"
          type="button"
          onClick={() => navigate("/register")}
        >
          إنشاء حساب
        </Button>
      </form>
      <SMF_Tech/>
    </div>
  );
}
