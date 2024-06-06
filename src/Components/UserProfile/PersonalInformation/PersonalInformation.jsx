import React from "react";
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
import { useState } from "react";
const PersonalInformation = ({
  initValues,
  formikChange,
  setPhoneNumer,
  phoneNumber,
  gender,
  setGender,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6  font-[Cairo] font-bold ">
      <Input
        type="text"
        label="Name"
        variant="underlined"
        startContent={<NameIcon />}
        isReadOnly
        size="lg"
        value={initValues.displayName}
      />
      <Input
        type="Email"
        label="Email"
        variant="underlined"
        startContent={<MailIcon />}
        size="lg"
        isReadOnly
        value={initValues.email}
      />
      <Input
        type="Phone"
        label="Phone"
        variant="underlined"
        startContent={<PhoneIcon />}
        isReadOnly
        value={initValues.phoneNumber.replace("+", "")}
      />

      <Input
        name="emergency_contact_name"
        type="text"
        label="Emergency Contact Name"
        variant="underlined"
        startContent={<NameIcon />}
        size="lg"
        value={initValues.emergency_contact_name}
        onChange={formikChange}
      />
      <div className="w-full mt-2">
        <label htmlFor="emergency_contact_number" className="w-full text-sm ">
          Emergency Contact Number
        </label>
        <PhoneInput
          className="w-full border-b-2 hover:border-gray-300  focus::border-black mt-2"
          name="emergency_contact_number"
          labels={ar}
          defaultCountry="EG"
          value={phoneNumber}
          onChange={setPhoneNumer}
          international
          countryCallingCodeEditable={false}
        />
      </div>

      <div className="flex flex-row gap-1 justify-center items-start ">
        <Checkbox
          name="isSharable"
          size="lg"
          onClick={() => setGender(gender === "male" ? "" : "male")}
          isSelected={gender === "male"}
        >
          <p className="text-xl">Male </p>
        </Checkbox>
        <MaleIcon />
        <Checkbox
          name="isSharable"
          size="lg"
          onClick={() => setGender(gender === "female" ? "" : "female")}
          isSelected={gender === "female"}
        >
          <p className="text-xl">Female</p>
        </Checkbox>
        <FemaleIcon />
      </div>
    </div>
  );
};

export default PersonalInformation;
