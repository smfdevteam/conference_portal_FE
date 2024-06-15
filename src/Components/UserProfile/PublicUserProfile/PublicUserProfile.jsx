import React, { useEffect, useState, useRef } from "react";
import { getPublicProfile } from "../../../Api/auth.service";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Avatar,
  CardFooter,
  Button,
} from "@nextui-org/react";
import GradientSvg from "../UserProfileAnimation/GradientSvg";
import "./PublicUserProfile.css";

const PublicUserProfile = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getPublicProfile(uid);
        setUserData(response);
      } finally {
      }
    };
    getUserData();
  }, [uid]);
  console.log("response === ", userData);

  if (userData) {
    const {
      photoURL,
      birthPlace,
      country,
      university,
      job,
      displayName,
      bio,
      social,
      church,
      company,
      isGrad,
      isLeader,
    } = userData;
    return (
      <div className="font-[Cairo] w-full text-3xl md:text-6xl">
        <div className="absolute inset-0 bg-[#fbfdfb] rounded-md ">
          <GradientSvg />
        </div>

        <div className=" relative flex flex-col items-center justify-center mt-8 md:mt-24 gap-3 md:gap-8 text-center">
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
            src={photoURL}
            alt="NextUI Album Cover"
            className="  bg-primary  w-32 h-32  md:w-64 md:h-64 "
          />
          <h1 className=" font-extrabold  ">{displayName}</h1>
          {isGrad ? (
            <p>
              {job} {company ? "At " + company : ""}
            </p>
          ) : (
            <p>Student {university ? "At " + university : ""}</p>
          )}

          <p className="border-1 border-gray-200 drop-shadow-xl shadow-lg w-full">
            {country ? country + "," : ""}
            {birthPlace}
          </p>
          <p>{church}</p>
          <p className=" border-1 border-gray-200 drop-shadow-xl shadow-lg p-2">
            {bio}
          </p>
        </div>
      </div>
    );
  }
};

export default PublicUserProfile;
