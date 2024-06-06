import React from "react";
import { stateProvider } from "../../Context/App_Context";
import { useContext } from "react";
import { Avatar, Checkbox, Button } from "@nextui-org/react";
import { useState } from "react";
import WavySvg from "./UserProfileAnimation/WavySvg";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import BasicInformation from "./BasicInformation/BasicInformation";
import SocialMedia from "./SocialMedia/SocialMedia";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import { editProfile } from "../../Api/auth.service";
const categories = [
  "Personal Information",
  "Basic Information",
  "Social Media",
];

const onSubmit = async ({
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
}) => {
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
  })
  
};

const UserProfile = () => {
  const [activeCategory, setActiveCategory] = useState("Personal Information");
  const { app_state, setAppState } = useContext(stateProvider);
  const [phoneNumber, setPhoneNumer] = useState(
    app_state.user.emergency_contact_number
  );
  const [gender, setGender] = useState(app_state.user.gender);
  const [genderInitValue,setGenderInitValue] = useState(gender)
  

  const formik = useFormik({
    initialValues: { ...app_state.user },
    validationSchema: Yup.object({
      emergency_contact_name: Yup.string().test(
        "emergency_contact_name",
        "Name is Required",
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
        .test("phone", "Phone is Required", () => {
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
        .test("phone", "Not Valid Number", () => {
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
  formik.values.setAppState = setAppState
  const handleErrorPostion = () => {
    if (
      (formik.errors.emergency_contact_number ||
        formik.errors.emergency_contact_name) &&
      !formik.errors.birthday
    ) {
      setActiveCategory("Personal Information");
    } else if (formik.errors.birthday) {
      setActiveCategory("Basic Information");
    }
  };

  return (
    <div className="w-full  font-bold ">
      <form onSubmit={formik.handleSubmit}>
        <div className=" absolute w-full h-auto  inset-0 ">
          <WavySvg />
        </div>
        <div className="flex flex-col justify-center items-center mt-8 md:mt-44 gap-8 w-full">
          <Avatar
            isBordered
            color="primary"
            imgProps={{
              style: {
                objectFit: "contain",
                width: "100%",
                height: "100%",
              },
            }}
            src={formik.values.photoURL}
            alt="NextUI Album Cover"
            className="w-32 h-32  md:w-64 md:h-64 bg-warning"
          />
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
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-1 text-md p-1  text-center rounded-lg transition-all duration-300 ease-in-out ${
                    activeCategory === category
                      ? "bg-blue-500 text-white transform scale-105"
                      : "bg-gray-200 text-gray-700 transform scale-100"
                  }`}
                >
                  <p>{category}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 w-full">
            <h2 className="text-xl font-semibold text-center">
              {activeCategory}
            </h2>
            {activeCategory === "Personal Information" && (
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
            {activeCategory === "Basic Information" && (
              <BasicInformation
                initValues={formik.values}
                formikChange={formik.handleChange}
                formikErrors={formik.errors}
              />
            )}
            {activeCategory === "Social Media" && (
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
        >
          Save Edit
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
