import React from "react";
import { stateProvider } from "../../Context/App_Context";
import { useContext } from "react";
import { Avatar, Image } from "@nextui-org/react";
import { useState } from "react";
import WavySvg from "./UserProfileAnimation/WavySvg";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import BasicInfomation from "./BasicInformation/BasicInfomation";
import SocialMedia from "./SocialMedia/SocialMedia";
const UserProfile = () => {
  const [activeCategory, setActiveCategory] = useState("Personal Information");
  const { app_state, setAppState } = useContext(stateProvider);
  const categories = [
    "Personal Information",
    "Basic Information",
    "Social Media",
  ];
  return (
    <div className="w-full ">
      <div className=" absolute w-full h-auto  inset-0 ">
        <WavySvg />
      </div>
      <div className="flex flex-col justify-center items-center mt-8 md:mt-44 gap-8 w-full">
        <Avatar
          isBlurred
          isZoomed
          isBordered
          
          color="primary"
          imgProps={{
            style: {
              objectFit: "contain",
              width:'100%',
              height:'100%' 
            },
          }}
          
          src={app_state.user.photoURL}
          alt="NextUI Album Cover"
          className="w-32 h-32  md:w-64 md:h-64 bg-warning"
        />
        <div className="drop-shadow-lg rounded-md w-full md:w-3/5">
          <div className="flex flex-row rounded-md   justify-center p-1 gap-2 bg-gradient-to-r from-sky-400 to-sky-800  m-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-1 text-md p-1  text-center rounded-lg transition-all duration-300 ease-in-out ${
                  activeCategory === category
                    ? "bg-blue-500 text-white transform scale-105"
                    : "bg-gray-200 text-gray-700 transform scale-100"
                }`}
              >
                <p>{category}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5 w-full">
          <h2 className="text-xl font-semibold text-center">
            {activeCategory}
          </h2>
          {activeCategory === "Personal Information" && <PersonalInformation />}
          {activeCategory === "Basic Information" && <BasicInfomation />}
          {activeCategory === "Social Media" && <SocialMedia />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
