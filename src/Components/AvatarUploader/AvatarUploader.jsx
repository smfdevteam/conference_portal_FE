import { useState, useRef } from "react";
import { Avatar, Image } from "@heroui/react";
const AvatarUploader = ({ avatarImage, setAvatarImage }) => {
  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setAvatarImage(selectedImage);
  };

  const handleAvatarClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-start items-center  m-2 drop-shadow-2xl ">
      <Image
        src={
          avatarImage ? URL.createObjectURL(avatarImage) : "Images/young man white.svg"
        }
        onClick={handleAvatarClick}
        color={avatarImage ? "success" : "default"}
        isBlurred
        isZoomed
        className="w-16 "
        alt="Default Avatar Image"
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      <label htmlFor="avatarInput" className="ml-2 font-semibold">
        Upload Image
      </label>
    </div>
  );
};

export default AvatarUploader;
