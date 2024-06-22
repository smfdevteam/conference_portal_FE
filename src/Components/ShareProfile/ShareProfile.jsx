import React from "react";
import ShareIcon from "./ShareIcon";
import { Button } from "@nextui-org/react";
const ShareProfile = ({ userId }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        url: `${window.location.origin}/public/${userId}`,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
    <h1 className="my-4">ابعت البروفايل لحد</h1>
      <Button
        className="w-10 h-16  rounded-full bg-[#B89811] hover:bg-[#F5A524] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-white  font-bold flex items-center justify-center shadow-lg"
        color="danger"
        onClick={handleShare}
      >
        <ShareIcon />
      </Button>
    </div>
      
  );
};

export default ShareProfile;
