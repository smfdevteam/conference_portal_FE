import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AvatarUploader from "../AvatarUploader/AvatarUploader";
import { EyeFilledIcon } from "../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Icons/EyeSlashFilledIcon";
import CustomToolTip from "../CustomToolTip/CustomToolTip";
import { register } from "../../Api/api";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  profileImage: "",
  notificationToken: localStorage.getItem("notification_token"),
};

const onSubmit = async ({
  name,
  phone,
  email,
  password,
  profileImage,
  setIsSubmiting,
}) => {
  try {
    setIsSubmiting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImage", profileImage);
    formData.append(
      "notificationToken",
      localStorage.getItem("notification_token")
    );
    console.log(Object.fromEntries(formData));
    const response = await register(formData);
    console.log("response", response);
  } catch (error) {
    console.log(error);
  } finally {
    setIsSubmiting(false);
  }
};

const validationSchema = Yup.object({
  name: Yup.string().required("اسمك مطلوب"),
  email: Yup.string().email("الايميل مش مظبوط").required("الايميل مطلوب"),
  password: Yup.string().required("الباسوورد مطلوب"),
  confirmPassword: Yup.string()
    .required("الباسوورد مطلوب")
    .oneOf([Yup.ref("password")], "الاتنين لازم يكونوا شبه بعض"),
  phone: Yup.string()
    .required("مطلوب الموبايل")
    .test("phone", "الموبايل مش مظبوط", (phone) =>
      isValidPhoneNumber(phone)
    ),
});

const RegisterForm = () => {
  const [phoneNumber, setPhoneNumer] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  formik.values.phone = phoneNumber;

  console.log("phone ==", formik.values.phone);
  console.log("error ==", formik.errors);
  console.log("touched ==", formik.touched.phone);
  formik.values.profileImage = avatarImage;
  formik.values.setIsSubmiting = setIsSubmiting;
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
            variant="bordered"
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
            variant="bordered"
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
            variant="bordered"
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
                  <EyeFilledIcon className="text-2xl text-primary pointer-events-none" />
                ) : (
                  <EyeSlashFilledIcon className="text-2xl text-primary pointer-events-none" />
                )}
              </button>
            }
          />
          <Input
            variant="bordered"
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
          <PhoneInput
            className={
              "border-2  rounded-xl h-14   p-5 text-right hover:border-[#A1A1AA] " +
              (formik.errors.phone && formik.touched.phone
                ? "border-[#F31763] hover:border-[#F31763] "
                : null)
            }
            name="phone"
            placeholder="الموبايل"
            defaultCountry="EG"
            value={phoneNumber}
            onChange={setPhoneNumer}
            onBlur={formik.handleBlur}
            international
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="text-[#F31763] text-sm">{formik.errors.phone}</div>
          ) : null}
          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={isSubmiting}
          >
            يلا بينا
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
