import React from "react";
import { Input, Textarea, Checkbox } from "@nextui-org/react";
import "./BasicInformation.css";
import { BirthplaceIcon, ChurchIcon, CollegeIcon, BioIcon,FlagIcon,JobIcon,CompanyIcon } from "../UserIcon";
const BasicInfomation = ({ formikChange, initValues }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6  font-[Cairo] font-bold">
      <div className="w-full z-50 flex flex-col relative">
        <label htmlFor="birthday" className=" text-sm ">
          Birth Date
        </label>
        <input
          className=" text-right  w-full   outline-none   border-b-2 border-s-black  hover:border-gray-300  focus::border-black   date-input pr-2 text-md  font-semibold"
          name="birthday"
          type="date"
          onChange={formikChange}
          value={initValues.birthday}
        />
      </div>

      <Input
        type="text"
        label="Birth Place"
        variant="underlined"
        startContent={
          <BirthplaceIcon  />
        }
        size="lg"
        name="birthPlace"
        value={initValues.birthPlace}
        onChange={formikChange}
      />
      <Input
        type="text"
        label="Country"
        variant="underlined"
        startContent={
          <FlagIcon  />
        }
        size="lg"
        name="country"
        value={initValues.country}
        onChange={formikChange}
      />
      <Input
        type="text"
        label="Church"
        variant="underlined"
        startContent={
          <ChurchIcon  />
        }
        size="lg"
        name="church"
        value={initValues.church}
        onChange={formikChange}
      />
      <Input
        type="text"
        label="University"
        variant="underlined"
        startContent={
          <CollegeIcon  />
        }
        size="lg"
        name="university"
        value={initValues.university}
        onChange={formikChange}
      />
      <Input
        type="text"
        label="College"
        variant="underlined"
        startContent={
          <CollegeIcon  />
        }
        size="lg"
        name="college"
        value={initValues.college}
        onChange={formikChange}
      />
      <Input
        type="text"
        label="Job"
        variant="underlined"
        startContent={
          <JobIcon  />
        }
        size="lg"
        name="job"
        value={initValues.job}
        onChange={formikChange}
      />
      <Input
        type="text"
        label="Company"
        variant="underlined"
        startContent={
          <CompanyIcon  />
        }
        size="lg"
        name="company"
        value={initValues.company}
        onChange={formikChange}
      />
      <Textarea
        label="Bio"
        variant="underlined"
        placeholder="Enter your description"
        disableAnimation
        disableAutosize
        classNames={{
          base: "max-w-xs",
          input: "resize-y min-h-[40px]",
        }}
        startContent={
          <BioIcon  />
        }
        name="bio"
        value={initValues.bio}
        onChange={formikChange}
      />
      <Checkbox
        name="isGrad"
        size="lg"
        isSelected={initValues.isGrad}
        onChange={formikChange}
      >
        <p className="text-2xl">are you graduate</p>
      </Checkbox>
    </div>
  );
};

export default BasicInfomation;
