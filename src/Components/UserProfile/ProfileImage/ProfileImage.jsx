import React, { useRef, useState } from "react";
import { Avatar, Button } from "@nextui-org/react";
import { CameraIcon } from "../UserIcon";
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 5242880;
const ProfileImage = ({ profileImage,setProfileImage,setSelectedFile }) => {
  const imageRef = useRef(null);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
        toast.error("حجم الملف يتجاوز 5 ميغابايت. الرجاء تحديد ملف أصغر.");
    } else {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleButtonClick = () => {
    imageRef.current.click();
  };

  return (
    <>
      <Avatar
        isBordered
        color="primary"
        imgProps={{
          style: {
            objectFit: "contain",
            width: "100%",
            height: "100%",
          },
        }}
        src={profileImage}
        alt="NextUI Album Cover"
        className="bg-warning  w-32 h-32  md:w-64 md:h-64 "
      />
      <div>
        <Button
          isIconOnly
          color="primary"
          variant="faded"
          aria-label="Take a photo"
          type="button"
          radius="full"
          size="sm"
          className="absolute  top-0 right-0 md:top-5 md:right-0 md:size-12"
          onClick={handleButtonClick}
        >
          <CameraIcon />
        </Button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={imageRef}
          onChange={handleFileChange}
        />
        
      </div>
    </>
  );
};

export default ProfileImage;
