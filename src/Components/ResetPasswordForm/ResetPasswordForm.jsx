import { useState } from "react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button, Link } from "@nextui-org/react";
import { resetClientPassword } from "../../Api/auth.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const initialValues = {
  email: "",
};
const onSubmit = async ({ email, setIsSubmiting }) => {
  try {
    setIsSubmiting(true);
    resetClientPassword(email);
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
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  formik.values.setIsSubmiting = setIsSubmiting;

  return (
    <div className="flex flex-col gap-6 font-[Cairo] font-semibold ">
      <div
        className="text-blue-600 border-2 w-fit rounded-md p-1 hover:bg-blue-600 hover:text-white duration-400  justify-end"
        onClick={() => navigate("/login")}
      >
        <p> تسجيل الدخول</p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full gap-4"
      >
        <h1>تغيير كلمة المرور أو إعادة ضبطها</h1>

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
        <Button
          color="primary"
          className="w-full"
          type="submit"
          isLoading={isSubmiting}
        >
          تغيير كلمة المرور
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
