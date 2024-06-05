import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import React from "react";
import smfLogo from "../../assets/images/brand/familyLogo-removebg-preview (1).png";
const Speaker_Card = ({speaker}) => {
  return (
    <Card
      isHoverable
      key={speaker.speakerId}
      isFooterBlurred
      className="h-[300px]"
    >
      <CardHeader className="absolute bg-black/20 justify-between z-10 top-0 items-start">
        <div className="flex flex-col">
          <p className="text-medium text-white/60 uppercase font-bold">
            {speaker.name}
          </p>
          <h4 className="text-white/90 font-medium text-xl">
            {speaker.subject}
          </h4>
        </div>
        <div className="flex flex-col gap-2">
          <Image
            alt="Breathing app icon"
            className="rounded-full w-10 h-10 object-contain bg-black"
            src={smfLogo}
          />
        </div>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover"
        src={speaker.url}
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-5 items-center">
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">{speaker.name}</p>
            <p className="text-tiny text-white/60">{speaker.about}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Speaker_Card;
