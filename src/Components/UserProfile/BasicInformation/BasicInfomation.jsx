import React from "react";
import { Input, DateInput, Textarea, Button } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import {
  BirthdayIcon,
  BirthplaceIcon,
  ChurchIcon,
  CollegeIcon,
  BioIcon,
} from "../UserIcon";
const BasicInfomation = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2  font-[Cairo]">
      <DateInput
        label={"Birth date"}
        placeholderValue={new CalendarDate(1995, 11, 6)}
        className="max-w-xs"
        startContent={
          <BirthdayIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
        }
        variant="underlined"
        size="lg"
      />
      <Input
        type="text"
        radius="none"
        label="Birth Place"
        variant="underlined"
        startContent={
          <BirthplaceIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
        }
        size="lg"
      />
      <Input
        type="text"
        radius="none"
        label="Church"
        variant="underlined"
        startContent={
          <ChurchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
        }
        size="lg"
      />
      <Input
        type="text"
        radius="none"
        label="University"
        variant="underlined"
        startContent={
          <CollegeIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
        }
        size="lg"
      />
      <Input
        type="text"
        radius="none"
        label="College"
        variant="underlined"
        startContent={
          <CollegeIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
        }
        size="lg"
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
          <BioIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
        }
      />
      <Button color="primary" className="w-full">
        Save
      </Button>
    </div>
  );
};

export default BasicInfomation;
