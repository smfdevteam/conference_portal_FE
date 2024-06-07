import { Checkbox, Input } from "@nextui-org/react";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import "react-phone-number-input/style.css";
import CustomToolTip from "../../CustomToolTip/CustomToolTip";
import {
  FemaleIcon,
  MailIcon,
  MaleIcon,
  NameIcon,
  PhoneIcon,
} from "../UserIcon";
import "./PersonalInformation.css";
const PersonalInformation = ({
  initValues,
  formikChange,
  setPhoneNumer,
  phoneNumber,
  gender,
  setGender,
  formikErrors,
  formikBlur,
  genderInitValue,
}) => {
  const [tipShow, setTipShow] = useState("");
  const handleGender = (genderValue) => {
    if (genderInitValue) {
    } else if (
      (genderValue === "male" && gender === "male") ||
      (genderValue === "female" && gender === "female")
    ) {
      setGender("");
    } else {
      setGender(genderValue);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-6  font-[Cairo] font-bold  relative">
      <Input
        name="name"
        type="text"
        label="إسمك"
        variant="underlined"
        startContent={<NameIcon />}
        isReadOnly
        size="lg"
        value={initValues.displayName}
        onMouseOver={() => setTipShow("name")}
        endContent={
          tipShow === "name" && (
            <CustomToolTip
              customStyle="text-3xl font-bold bg-blue-400"
              toolTipContent="من فضلك اتصل بالمسؤول إذا كانت هذه البيانات غير صحيحة أو إذا كنت ترغب في تغيير البيانات."
            />
          )
        }
      />
      <Input
        type="Email"
        label="الايميل الخاص بيك"
        variant="underlined"
        startContent={<MailIcon />}
        size="lg"
        isReadOnly
        value={initValues.email}
        onMouseOver={() => setTipShow("email")}
        endContent={
          tipShow === "email" && (
            <CustomToolTip
              customStyle="text-3xl font-bold bg-blue-400 "
              toolTipContent="من فضلك اتصل بالمسؤول إذا كانت هذه البيانات غير صحيحة أو إذا كنت ترغب في تغيير البيانات."
            />
          )
        }
      />
      <Input
        type="Phone"
        label="موبايلك"
        variant="underlined"
        startContent={<PhoneIcon />}
        isReadOnly
        value={initValues.phoneNumber.replace("+", "")}
        onMouseOver={() => setTipShow("phone")}
        endContent={
          tipShow === "phone" && (
            <CustomToolTip
              customStyle="text-3xl font-bold bg-blue-400"
              toolTipContent="من فضلك اتصل بالمسؤول إذا كانت هذه البيانات غير صحيحة أو إذا كنت ترغب في تغيير البيانات."
            />
          )
        }
      />

      <Input
        name="emergency_contact_name"
        type="text"
        label="في حالة الطواري اكتب اسم شخص نتصل بيه"
        variant="underlined"
        startContent={<NameIcon />}
        size="lg"
        value={initValues.emergency_contact_name}
        onChange={formikChange}
        isInvalid={formikErrors.emergency_contact_name ? true : false}
        errorMessage={formikErrors.emergency_contact_name}
      />
      <div className="w-full mt-2">
        <label
          htmlFor="emergency_contact_number"
          className={
            formikErrors.emergency_contact_number
              ? "text-[#F31763] text-sm w-full"
              : "w-full text-sm "
          }
        >
          الرقم اللي هنتصل بيه في حالة الطوارئ
        </label>
        <PhoneInput
          className={
            "w-full border-b-2 " +
            (formikErrors.emergency_contact_number
              ? " border-b-[#F31763] "
              : "hover:border-gray-300  focus::border-black mt-2")
          }
          name="emergency_contact_number"
          labels={ar}
          defaultCountry="EG"
          value={phoneNumber}
          onChange={setPhoneNumer}
          onBlur={formikBlur}
          international
          countryCallingCodeEditable={false}
        />
        {formikErrors.emergency_contact_number ? (
          <div className="text-[#F31763] text-sm">
            {formikErrors.emergency_contact_number}
          </div>
        ) : null}
      </div>

      <div
        className="flex flex-row gap-1 justify-center items-start  w-full"
        onMouseOver={() => setTipShow("gender")}
      >
        <div className="flex w-full justify-center items-center">
          <Checkbox
            name="isSharable"
            size="lg"
            onClick={() => handleGender("male")}
            isSelected={gender === "male"}
          >
            <p className="text-xl">Male </p>
          </Checkbox>
          <MaleIcon />
        </div>

        <div className="flex w-full justify-center items-center">
          <Checkbox
            name="isSharable"
            size="lg"
            onClick={() => handleGender("female")}
            isSelected={gender === "female"}
          >
            <p className="text-xl">Female</p>
          </Checkbox>
          <FemaleIcon />
        </div>
        <div className=" w-full flex-1 text-left">
          {tipShow === "gender" && genderInitValue && (
            <CustomToolTip
              customStyle="text-3xl font-bold bg-blue-400 "
              toolTipContent="من فضلك اتصل بالمسؤول إذا كانت هذه البيانات غير صحيحة أو إذا كنت ترغب في تغيير البيانات."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
