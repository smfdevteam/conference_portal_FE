import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AvatarUploader from "../AvatarUploader/AvatarUploader";
import { EyeFilledIcon } from "../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Icons/EyeSlashFilledIcon";
import { register } from "../../Api/api";
import CustomPhoneInput from "../CustomPhoneInput/CustomPhoneInput";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
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
  navigate
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
    if (response != "created") {
    } else {
      navigate('/login')
    }
  } finally {
    setIsSubmiting(false);
  }
};

const validationSchema = Yup.object({
  name: Yup.string().required("اسمك مطلوب"),
  email: Yup.string().email("الايميل مش مظبوط").required("الايميل مطلوب"),
  password: Yup.string()
    .required("الباسوورد مطلوب")
    .min(6, "كلمة المرور يجب أن تكون أكثر من 6 أحرف"),
  confirmPassword: Yup.string()
    .required("الباسوورد مطلوب")

    .oneOf([Yup.ref("password")], "الاتنين لازم يكونوا شبه بعض"),
  phone: Yup.string()
    .required("مطلوب الموبايل")
    .test("phone", "الموبايل مش مظبوط", (phone) => isValidPhoneNumber(phone)),
});

const RegisterForm = () => {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumer] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
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
  formik.values.navigate = navigate;
  return (
    <div className="font-semibold font-[Cairo]">
      <h1 className="text-center">يلا نعمل حساب جديد</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-3 py-4">
          <AvatarUploader
            setAvatarImage={setAvatarImage}
            avatarImage={avatarImage}
          />
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
          <CustomPhoneInput
            phoneNumber={phoneNumber}
            setPhoneNumer={setPhoneNumer}
            formik={formik}
          />
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
