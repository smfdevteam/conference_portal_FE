import React from "react";
import { Input, Button } from "@nextui-org/react";
import {
  FacebookIcon,
  YouTubeIcon,
  InstagramIcon,
  TikTokIcon,
} from "../UserIcon";
const SocialMedia = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2  font-[Cairo]">
      <Input
        type="text"
        radius="none"
        label="Facebook"
        variant="underlined"
        startContent={
          <FacebookIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
        }
        size="lg"
      />
      <Input
        type="text"
        radius="none"
        label="Youtube"
        variant="underlined"
        startContent={
          <YouTubeIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
        }
        size="lg"
      />
      <Input
        type="text"
        radius="none"
        label="Instagram"
        variant="underlined"
        startContent={
          <InstagramIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
        }
        size="lg"
      />
      <Input
        type="text"
        radius="none"
        label="TikTok"
        variant="underlined"
        startContent={
          <TikTokIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
        }
        size="lg"
      />

      <Button color="primary" className="w-full">
        Save
      </Button>
    </div>
  );
};

export default SocialMedia;
