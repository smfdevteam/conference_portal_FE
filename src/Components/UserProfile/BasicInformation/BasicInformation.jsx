import React from "react";
import {
  Input,
  Textarea,
  Checkbox,
  Select,
  SelectItem,
} from "@heroui/react";
import "./BasicInformation.css";
import {
  BirthplaceIcon,
  ChurchIcon,
  CollegeIcon,
  BioIcon,
  FlagIcon,
  JobIcon,
  CompanyIcon,
} from "../UserIcon";
import { governments } from "../../../assets/data/constants";
const BasicInfomation = ({ formikChange, initValues, formikErrors }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6  font-[Cairo] font-bold  relative">
      <div className="w-full  flex flex-col    ">
        <label
          htmlFor="birthday"
          className={
            " text-sm mb-2 " +
            (formikErrors.birthday ? " text-[#F31763] " : null)
          }
        >
          عيد ميلادي
        </label>
        <input
          className={
            " text-right  w-full   outline-none   border-b-2 border-s-black    focus::border-black   date-input pr-2 text-md  font-semibold " +
            (formikErrors.birthday
              ? " border-b-[#F31763] text-[#F31763]"
              : "hover:border-gray-300")
          }
          name="birthday"
          type="date"
          onChange={formikChange}
          value={initValues.birthday}
        />
        {formikErrors.birthday ? (
          <div className="text-[#F31763] text-sm">{formikErrors.birthday}</div>
        ) : null}
      </div>

      <Select
        variant="underlined"
        label="مكان ميلادي"
        className=" font-bold"
        name="birthPlace"
        selectedKeys={[initValues.birthPlace]}
        onChange={formikChange}
      
        startContent={<BirthplaceIcon />}
        
      >
        {governments.map((government) => (
          <SelectItem name="birthPlace" key={government.namePrimaryLang}   textValue={government.nameSecondaryLang}>
            {government.nameSecondaryLang}
          </SelectItem>
        ))}
      </Select>
      
      <Input
        type="text"
        label="الدولة اللي اتولدت فيها"
        variant="underlined"
        startContent={<FlagIcon />}
        size="lg"
        name="country"
        value={initValues.country}
        onChange={formikChange}
      />
      <Input
        type="text"
        label="كنيستي"
        variant="underlined"
        startContent={<ChurchIcon />}
        size="lg"
        name="church"
        value={initValues.church}
        onChange={formikChange}
      />
      <Input
        type="text"
        label="جامعتي"
        variant="underlined"
        startContent={<CollegeIcon />}
        size="lg"
        name="university"
        value={initValues.university}
        onChange={formikChange}
      />
      <Input
        type="text"
        label="الكلية | المعهد"
        variant="underlined"
        startContent={<CollegeIcon />}
        size="lg"
        name="college"
        value={initValues.college}
        onChange={formikChange}
      />
      <Input
        type="text"
        label="بشتغل ايه ؟"
        variant="underlined"
        startContent={<JobIcon />}
        size="lg"
        name="job"
        value={initValues.job}
        onChange={formikChange}
      />
      <Input
        type="text"
        label="الشركة اللي بشتغل فيها"
        variant="underlined"
        startContent={<CompanyIcon />}
        size="lg"
        name="company"
        value={initValues.company}
        onChange={formikChange}
      />
      <Textarea
        label="Bio"
        variant="underlined"
        placeholder="ممكن هنا تكتب حاجة عن نفسك مختصرة "
        disableAnimation
        disableAutosize
        rows={5}
        classNames={{
          base: "w-full",
          input: "resize-y min-h-[40px] ",
        }}
        startContent={<BioIcon />}
        name="bio"
        value={initValues.bio}
        onChange={formikChange}
      />
      <Checkbox
        dir="ltr"
        name="isGrad"
        size="lg"
        isSelected={initValues.isGrad}
        onChange={formikChange}
      >
        <p className=" mx-2 text-2xl text-blue-400">خريج ؟</p>
      </Checkbox>
    </div>
  );
};

export default BasicInfomation;
