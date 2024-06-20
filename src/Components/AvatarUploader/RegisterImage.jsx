import React from "react";
import { useRef } from "react";
import { Avatar, Button } from "@nextui-org/react";
import { CameraIcon } from "../UserProfile/UserIcon";
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 5242880;
const RegisterImage = ({ avatarImage, setAvatarImage, setSelectedFile }) => {
  const imageRef = useRef(null);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file.size > MAX_FILE_SIZE) {
      toast.error("حجم الملف يتجاوز 5 ميغابايت. الرجاء تحديد ملف أصغر.");
    } else {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleButtonClick = () => {
    imageRef.current.click();
  };
  return (
    <div className=" relative flex justify-center items-start w-fit rounded-lg">
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
        src={avatarImage}
        className="bg-primary  w-32 h-32  md:w-64 md:h-64 "
      />
      <Button
        isIconOnly
        color="primary"
        variant="faded"
        aria-label="Take a photo"
        type="button"
        radius="full"
        size="sm"
        className="absolute  bottom-0 right-0 md:bottom-5 md:right-0 md:size-12"
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
  );
};

export default RegisterImage;
