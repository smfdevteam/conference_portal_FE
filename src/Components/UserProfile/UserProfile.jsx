import React from "react";

import { stateProvider } from "../../Context/App_Context";
import { useContext } from "react";
import { Checkbox, Button } from "@nextui-org/react";
import { useState } from "react";
import WavySvg from "./UserProfileAnimation/WavySvg";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import BasicInformation from "./BasicInformation/BasicInformation";
import SocialMedia from "./SocialMedia/SocialMedia";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import { editProfile, editProfileImage } from "../../Api/auth.service";
import ProfileImage from "./ProfileImage/ProfileImage";

const categories = {
  personal: {
    ar: "البيانات الشخصية",
    en: "Personal Information",
  },
  basic: {
    ar: "البيانات الأساسية",
    en: "Basic Information",
  },
  social: {
    ar: "التواصل الإجتماعي",
    en: "Social Media",
  },
};

const onSubmit = async ({
  setIsSubmiting,
  X,
  bio,
  birthPlace,
  birthday,
  church,
  college,
  company,
  country,
  emergency_contact_name,
  emergency_contact_number,
  facebook,
  gender,
  instagram,
  isGrad,
  isSharable,
  job,
  notificationToken,
  tiktok,
  university,
  youtube,
  profileImage,
  setAppState
}) => {
  try {

    setIsSubmiting(true);
    const response = await editProfile({
      X,
      bio,
      birthPlace,
      birthday,
      church,
      college,
      company,
      country,
      emergency_contact_name,
      emergency_contact_number,
      facebook,
      gender,
      instagram,
      isGrad,
      isSharable,
      job,
      notificationToken,
      tiktok,
      university,
      youtube,
    });
    if (profileImage) {
      const formData = new FormData();
      formData.append("image", profileImage);
      const imageResponse = await editProfileImage(formData);
      setAppState((prev) => {
        return { ...prev, user: imageResponse};
      });
    }
  } finally {
    setIsSubmiting(false);
  }
};

const UserProfile = () => {
  const [activeCategory, setActiveCategory] = useState(categories.personal.en);
  const { app_state, setAppState } = useContext(stateProvider);
  const [phoneNumber, setPhoneNumer] = useState(
    app_state.user.emergency_contact_number
  );
  const [gender, setGender] = useState(app_state.user.gender);
  const [genderInitValue, setGenderInitValue] = useState(gender);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(app_state.user.photoURL);
  const formik = useFormik({
    initialValues: { ...app_state.user },
    validationSchema: Yup.object({
      emergency_contact_name: Yup.string().test(
        "emergency_contact_name",
        "الاسم مطلوب",
        (emergency_contact_name) => {
          emergency_contact_name = emergency_contact_name
            ? emergency_contact_name
            : "";
          if (
            formik.values.emergency_contact_number &&
            formik.values.emergency_contact_number.length > 0 &&
            emergency_contact_name.length === 0
          ) {
            return false;
          } else {
            return true;
          }
        }
      ),
      emergency_contact_number: Yup.string()
        .test("phone", "مطلوب الموبايل", () => {
          if (
            formik.values.emergency_contact_name &&
            formik.values.emergency_contact_name.length > 0 &&
            formik.values.emergency_contact_number.length === 0
          ) {
            return false;
          } else {
            return true;
          }
        })
        .test("phone", "الموبايل مش مظبوط", () => {
          if (
            formik.values.emergency_contact_number.length > 0 &&
            !isValidPhoneNumber(formik.values.emergency_contact_number) &&
            formik.values.emergency_contact_name.length > 0
          ) {
            return false;
          } else {
            return true;
          }
        }),
      birthday: Yup.date()
        .min(new Date(1900, 0, 1), "Date must be after January 1, 1900")
        .max(new Date(), "Date cannot be in the future"),
    }),
    onSubmit,
  });
  formik.values.emergency_contact_number = phoneNumber ? phoneNumber : "";
  formik.values.gender = gender;
  formik.values.setAppState = setAppState;
  formik.values.setIsSubmiting = setIsSubmiting;
  formik.values.profileImage = selectedFile;
  const handleErrorPostion = () => {
    if (
      (formik.errors.emergency_contact_number ||
        formik.errors.emergency_contact_name) &&
      !formik.errors.birthday
    ) {
      setActiveCategory(categories.personal.en);
    } else if (formik.errors.birthday) {
      setActiveCategory(categories.basic.en);
    }
  };

  return (
    <div className="w-full  font-bold ">
      <form onSubmit={formik.handleSubmit}>
        <div className=" absolute w-full h-auto  inset-0 ">
          <WavySvg />
        </div>
        <div className="flex flex-col justify-center items-center mt-8 md:mt-44 gap-8 w-full">
          <div className=" relative bg-red-800 rounded-full">
            <ProfileImage
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              setSelectedFile={setSelectedFile}
            />
          </div>
          <Checkbox
            name="isSharable"
            size="lg"
            isSelected={formik.values.isSharable}
            onChange={formik.handleChange}
          >
            <p className="text-2xl">تحب تشير البروفايل</p>
          </Checkbox>
          <div className="drop-shadow-lg rounded-md w-full md:w-3/5">
            <div className="flex flex-row rounded-md   justify-center p-1 gap-3 bg-gradient-to-r from-sky-400 to-sky-800  m-auto">
              {Object.keys(categories).map((key) => (
                <button
                  type="button"
                  key={categories[key].en}
                  onClick={() => setActiveCategory(categories[key].en)}
                  className={`flex-1 text-md p-1  text-center rounded-lg transition-all duration-300 ease-in-out ${
                    activeCategory === categories[key].en
                      ? "bg-blue-500 text-white transform scale-105"
                      : "bg-gray-200 text-gray-700 transform scale-100"
                  }`}
                >
                  <p>{categories[key].ar}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 w-full">
            <h2 className="text-xl font-semibold text-center">
              {activeCategory}
            </h2>
            {activeCategory === categories.personal.en && (
              <PersonalInformation
                initValues={formik.values}
                formikChange={formik.handleChange}
                phoneNumber={phoneNumber}
                setPhoneNumer={setPhoneNumer}
                gender={gender}
                setGender={setGender}
                formikErrors={formik.errors}
                formikBlur={formik.handleBlur}
                genderInitValue={genderInitValue}
              />
            )}
            {activeCategory === categories.basic.en && (
              <BasicInformation
                initValues={formik.values}
                formikChange={formik.handleChange}
                formikErrors={formik.errors}
              />
            )}
            {activeCategory === categories.social.en && (
              <SocialMedia
                initValues={formik.values}
                formikChange={formik.handleChange}
              />
            )}
          </div>
        </div>
        <Button
          color="primary"
          className="w-full text-2xl mt-4"
          type="submit"
          onClick={handleErrorPostion}
          isLoading={isSubmiting}
        >
          Save Edit
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
