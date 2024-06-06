import React from "react";
import { Input, Textarea, Checkbox } from "@nextui-org/react";
import "./BasicInformation.css";
import { BirthplaceIcon, ChurchIcon, CollegeIcon, BioIcon,FlagIcon,JobIcon,CompanyIcon } from "../UserIcon";
const BasicInfomation = ({ formikChange, initValues,formikErrors }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6  font-[Cairo] font-bold ">
      <div className="w-full z-50 flex flex-col relative">
        <label htmlFor="birthday" className={" text-sm " + (formikErrors.birthday
            ? " text-[#F31763] "
            : null)}>
          تاريخ الميلاد
        </label>
        <input
          className={" text-right  w-full   outline-none   border-b-2 border-s-black    focus::border-black   date-input pr-2 text-md  font-semibold " + (formikErrors.birthday
            ? " border-b-[#F31763] text-[#F31763]"
            : "hover:border-gray-300")}
          name="birthday"
          type="date"
          onChange={formikChange}
          value={initValues.birthday}
        />
        {formikErrors.birthday ? (
          <div className="text-[#F31763] text-sm">
            {formikErrors.birthday}
          </div>
        ) : null}
      </div>

      <Input
        type="text"
        label="منشأ"
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
        label="بلد"
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
        label="الكنيسة"
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
        label="الجامعة"
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
        label="الكلية"
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
        label="العمل"
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
        label="الشركة"
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
      
        label="السيرة الذاتية"
        variant="underlined"
        placeholder="عرفني بنفسكbio"
        disableAnimation
        disableAutosize
        classNames={{
          base: "w-full ",
          input: "resize-y min-h-[40px] ",
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
        <p className="text-2xl text-blue-400">هل أنت خريج</p>
      </Checkbox>
    </div>
  );
};

export default BasicInfomation;
