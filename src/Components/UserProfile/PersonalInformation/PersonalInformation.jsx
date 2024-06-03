import React from "react";
import { Input } from "@nextui-org/react";
import { NameIcon,MailIcon,PhoneIcon } from "../UserIcon"; 
const PersonalInformation = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2  font-[Cairo]">
      <Input
        type="text"
        radius="none"
        label="Name"
        variant="underlined"
        startContent={
          <NameIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
        }
        isReadOnly
        size="lg"
      />
      <Input
        type="Email"
        label="Email"
        variant="underlined"
        startContent={
          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
        }
        size="lg"
        isReadOnly
      />
      <Input
        type="Phone"
        label="Phone"
        variant="underlined"
        startContent={
          <PhoneIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
        }
        isReadOnly
      />
    </div>
  );
};

export default PersonalInformation;
