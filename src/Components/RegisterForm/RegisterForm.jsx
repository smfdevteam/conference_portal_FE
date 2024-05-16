import { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AvatarUploader from "../AvatarUploader/AvatarUploader";
import { EyeFilledIcon } from "../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Icons/EyeSlashFilledIcon";
import CustomToolTip from "../CustomToolTip/CustomToolTip";
import { api } from "../../Api/api";
import { register } from "../../Api/api";
const initialValues = {
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  profileImage: "",
};

const onSubmit = async ({ name, phone, email, password, profileImage }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("profileImage", profileImage);
  console.log(Object.fromEntries(formData));
  const response = await register(formData)
  console.log("response",response)
};

const validationSchema = Yup.object({
  name: Yup.string().required("اسمك مطلوب"),
  email: Yup.string().email("الايميل مش مظبوط").required("الايميل مطلوب"),
  password: Yup.string().required("الباسوورد مطلوب"),
  confirmPassword: Yup.string()
    .required("الباسوورد مطلوب")
    .oneOf([Yup.ref("password")], "الاتنين لازم يكونوا شبه بعض"),
  phone: Yup.string().required("مطلوب الموبايل"),
});

const RegisterForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  
  formik.values.profileImage = avatarImage;

  return (
    <div className="font-semibold">
      <h1 className="text-center">يلا نعمل حساب جديد</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-3 py-4">
          <AvatarUploader
            setAvatarImage={setAvatarImage}
            avatarImage={avatarImage}
          />
          {errorMessage ? (
            <div className="text-red-400 text-center border rounded-md ">
              <h1>error message</h1>
            </div>
          ) : null}
          <Input
            variant="faded"
            name="name"
            type="text"
            label="الاسم"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            isInvalid={
              formik.touched.name && (formik.errors.name ? true : false)
            }
            errorMessage={formik.errors.name}
          />
          <Input
            variant="faded"
            name="email"
            type="text"
            label="الايميل"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            isInvalid={
              formik.touched.email && (formik.errors.email ? true : false)
            }
            errorMessage={formik.errors.email}
          />
          <Input
            variant="faded"
            name="password"
            type={isVisible ? "text" : "password"}
            label="الباسوورد"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isInvalid={
              formik.touched.password && (formik.errors.password ? true : false)
            }
            errorMessage={formik.errors.password}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-primary pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-primary pointer-events-none" />
                )}
              </button>
            }
          />
          <Input
            variant="faded"
            name="confirmPassword"
            type="password"
            label="أكد الباسوورد"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            isInvalid={
              formik.touched.confirmPassword &&
              (formik.errors.confirmPassword ? true : false)
            }
            errorMessage={formik.errors.confirmPassword}
          />
          <Input
            variant="faded"
            name="phone"
            type="tel"
            label="الموبايل"
            onChange={formik.handleChange}
            value={formik.values.phone}
            endContent={
              <CustomToolTip
                customStyle=" bg-blue-400 my-4 -ml-4"
                toolTipHeader="لية رقم الموبايل ؟"
                toolTipContent="عشان لو حصل حاجة نقدر نوصل ليك بسرعة من
                    فضللك ادخل رقم الموبيل ذى "
                highLightedMessge="(+20100XXXX)"
              />
            }
            isInvalid={
              formik.touched.phone && (formik.errors.phone ? true : false)
            }
            errorMessage={formik.errors.phone}
          />
          <Button type="submit" color="primary" className="w-full">
            يلا بينا
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
