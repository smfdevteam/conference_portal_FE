import React, { useState } from "react";
import { Input, Checkbox } from "@nextui-org/react";
import {
  NameIcon,
  MailIcon,
  PhoneIcon,
  MaleIcon,
  FemaleIcon,
} from "../UserIcon";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ar from "react-phone-number-input/locale/ar";
import "./PersonalInformation.css";
import CustomToolTip from "../../CustomToolTip/CustomToolTip";
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
  return (
    <div className="flex flex-col justify-center items-center gap-6  font-[Cairo] font-bold ">
      <Input
        name="name"
        type="text"
        label="الاسم"
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
        label="الإيميل"
        variant="underlined"
        startContent={<MailIcon />}
        size="lg"
        isReadOnly
        value={initValues.email}
        onMouseOver={() => setTipShow("email")}
        endContent={
          tipShow === "email" && (
            <CustomToolTip
              customStyle="text-3xl font-bold bg-blue-400"
              toolTipContent="من فضلك اتصل بالمسؤول إذا كانت هذه البيانات غير صحيحة أو إذا كنت ترغب في تغيير البيانات."
            />
          )
        }
      />
      <Input
        type="Phone"
        label="الموبايل"
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
        label="اسم جهة الاتصال في حالات الطوارئ"
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
          رقم الاتصال في حالات الطوارئ
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

      <div className="flex flex-row gap-4 justify-center items-start ">
        <div
          className={
            genderInitValue == ""
              ? "flex"
              : genderInitValue === "male"
              ? "flex"
              : "hidden"
          }
        >
          <Checkbox
            name="isSharable"
            size="lg"
            onClick={() => setGender(genderInitValue==="male"? "male":gender === "male" ? "" : "male")}
            isSelected={gender === "male"}
          >
            <p className="text-xl">Male </p>
          </Checkbox>
          <MaleIcon />
        </div>

        <div
          className={
            genderInitValue == ""
              ? "flex"
              : genderInitValue === "female"
              ? "flex"
              : "hidden"
          }
        >
          <Checkbox
            name="isSharable"
            size="lg"
            onClick={() => setGender(genderInitValue==="female"? "female":gender === "female" ? "" : "female")}
            isSelected={gender === "female"}
          >
            <p className="text-xl">Female</p>
          </Checkbox>
          <FemaleIcon />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
