import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EyeFilledIcon } from "../Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Icons/EyeSlashFilledIcon";
import { register } from "../../Api/auth.service";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import GradientSvg from "../UserProfile/UserProfileAnimation/GradientSvg";
import RegisterImage from "../AvatarUploader/RegisterImage";
import SMF_Tech from "../SMF_Tech";

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
  navigate,
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
    if (response === "created") {
      navigate("/login");
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
  const navigate = useNavigate();

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  formik.values.profileImage = selectedFile;
  formik.values.setIsSubmiting = setIsSubmiting;
  formik.values.navigate = navigate;

  return (
    <div className="font-semibold font-[Cairo]">
      <div className="absolute inset-0 rounded-md ">
        <GradientSvg />
      </div>
      <div className="mt-4 sm:mt-12">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-3 py-4 justify-center items-center  text-2xl">
            <RegisterImage
              avatarImage={avatarImage}
              setAvatarImage={setAvatarImage}
              setSelectedFile={setSelectedFile}
            />
            <h1 className="text-center  ">يلا نعمل حساب جديد</h1>
            <Input
              color="primary"
              variant="bordered"
              name="name"
              type="text"
              label="الاسم"
              radius="full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={
                formik.touched.name && (formik.errors.name ? true : false)
              }
              errorMessage={formik.errors.name}
            />
            <Input
              color="primary"
              variant="bordered"
              name="email"
              type="text"
              label="الايميل"
              radius="full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isInvalid={
                formik.touched.email && (formik.errors.email ? true : false)
              }
              errorMessage={formik.errors.email}
            />
            <Input
              color="primary"
              variant="bordered"
              name="password"
              radius="full"
              type={isVisible ? "text" : "password"}
              label="الباسوورد"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              isInvalid={
                formik.touched.password &&
                (formik.errors.password ? true : false)
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
              color="primary"
              variant="bordered"
              name="confirmPassword"
              type="password"
              label="أكد الباسوورد"
              radius="full"
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
              dir="ltr"
              color="primary"
              variant="bordered"
              name="phone"
              type="tel"
              label="الموبايل"
              radius="full"
              description="هتكتب 2+ و بعدين رقمك عادي و ممكن تبدل بكود دولة تاني لو مش معاك خط مصري"
              placeholder="+2010054349XX"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              isInvalid={
                formik.touched.phone && (formik.errors.phone ? true : false)
              }
              errorMessage={formik.errors.phone}
            />
            <Button
              type="submit"
              color="primary"
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600"
              isLoading={isSubmiting}
              isDisabled={isSubmiting}
              radius="full"
            >
              يلا بينا
            </Button>
            <Button
              type="button"
              color="primary"
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600"
              radius="full"
              onClick={() => navigate("/login")}
            >
              لديك حساب ؟
            </Button>
          </div>
        </form>
      </div>
            <SMF_Tech show={false} />
    </div>
  );
};

export default RegisterForm;
