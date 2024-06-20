import { useState } from "react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button,Avatar } from "@nextui-org/react";
import logo from "/smf.png";
import { resetClientPassword } from "../../Api/auth.service";
import { useNavigate } from "react-router-dom";
import GradientSvg from "../UserProfile/UserProfileAnimation/GradientSvg";
const initialValues = {
  email: "",
};
const onSubmit = ({ email, setIsSubmiting, setEmailSent }) => {
  try {
    setIsSubmiting(true);
    resetClientPassword(email);
    setEmailSent(true);
  } finally {
    setIsSubmiting(false);
  }
};
const validationSchema = Yup.object({
  email: Yup.string().email("الايميل مش مظبوط").required("الايميل مطلوب"),
});
const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const handleClick = () => {
    setEmailSent(false);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  formik.values.setIsSubmiting = setIsSubmiting;
  formik.values.setEmailSent = setEmailSent;

  return (
    <div className="flex flex-col gap-6 font-[Cairo] font-semibold ">
      <div className="absolute inset-0 rounded-md  ">
        <GradientSvg />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full gap-4  justify-items-center items-center text-2xl text-center"
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
        <h1>تغيير كلمة المرور أو إعادة ضبطها</h1>
        <Input
          name="email"
          type="email"
          variant="bordered"
          label="الايميل"
          radius="full"
          value={formik.values.email}
          onChange={formik.handleChange}
          onClick={handleClick}
          onBlur={formik.handleBlur}
          isInvalid={
            formik.touched.email && (formik.errors.email ? true : false)
          }
          errorMessage={formik.errors.email}
        />
        <Button
          color="primary"
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600"
          type="submit"
          isLoading={isSubmiting}
          radius="full"
        >
          تغيير كلمة المرور
        </Button>
        <Button
          color="primary"
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600"
          type="button"
          radius="full"
          onClick={()=>navigate("/login")}
        >
          تسجيل الدخول
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
