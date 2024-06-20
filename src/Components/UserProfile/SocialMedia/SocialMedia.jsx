import React from "react";
import { Input, Button } from "@nextui-org/react";
import {
  FacebookIcon,
  YouTubeIcon,
  InstagramIcon,
  TikTokIcon,
  TwitterIcon
} from "../UserIcon";
const SocialMedia = ({formikChange,initValues}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6  font-[Cairo] font-bold">
      <Input

        type="text"
        radius="none"
        label="Facebook"
        variant="underlined"
        startContent={
          <FacebookIcon  />
        }
        size="lg"
        name="facebook"
        value={initValues.facebook}
        onChange={formikChange}
      />
      <Input
        type="text"
        radius="none"
        label="Youtube"
        variant="underlined"
        startContent={
          <YouTubeIcon  />
        }
        size="lg"
        name="youtube"
        value={initValues.youtube}
        onChange={formikChange}
      />
      <Input
        type="text"
        radius="none"
        label="Instagram"
        variant="underlined"
        startContent={
          <InstagramIcon  />
        }
        size="lg"
        name="instagram"
        value={initValues.instagram}
        onChange={formikChange}
      />
      <Input
        type="text"
        radius="none"
        label="TikTok"
        variant="underlined"
        startContent={
          <TikTokIcon  />
        }
        size="lg"
        name="tiktok"
        value={initValues.tiktok}
        onChange={formikChange}
      />
      <Input
        type="text"
        radius="none"
        label="Twitter"
        variant="underlined"
        startContent={
          <TwitterIcon  />
        }
        size="lg"
        name="X"
        value={initValues.X}
        onChange={formikChange}
      />
    </div>
  );
};

export default SocialMedia;
