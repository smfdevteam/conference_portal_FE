import { stateProvider } from "../../Context/App_Context";
import { useContext } from "react";
import SMF_QR from "../QR/SMF_QR";
import personPlaceHolder from "../../assets/images/team/samaan.png";
import Smf_Modal from "../shared/Smf_Modal";
import ShareProfile from "../ShareProfile/ShareProfile";
import ShareIcon from "../ShareProfile/ShareIcon";
import ShareSvg from "../../assets/images/icons/share.svg";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Avatar,
} from "@nextui-org/react";
const User_Card = () => {
  const navigate = useNavigate;
  const { app_state, setAppState } = useContext(stateProvider);
  console.log(app_state);
  const { displayName, email, photoURL, phoneNumber } = app_state.user;
  return (
    <Card dir="ltr">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={photoURL}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{displayName}</p>
          <p className="text-small text-default-500">{email}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{phoneNumber}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex justify-center items-center flex-1 gap-4">
          <div className="">
            <Link isExternal showAnchorIcon href="/user">
              View my profile
            </Link>
          </div>
          <div className="flex justify-center items-center ">
            <p className="text-[#006FEE]">Share</p>
            <Smf_Modal isBtnImage btnImgSrc={ShareSvg}>
              <div className="flex flex-col justify-center items-center gap-1 text-xl   max-h-[85vh] ">
                <div className="flex flex-col justify-center items-center gap-1 font-[Cairo] ">
                  <Avatar
                    isBordered
                    alt="nextui logo"
                    src={photoURL}
                    className="w-20 h-20 text-large "
                    color="warning"
                  />
                  <p className="text-md ">{displayName}</p>
                  <p className="text-md ">{email}</p>
                  <h1>خلي صاحبك يعمل سكان هنا</h1>
                  <SMF_QR />
                </div>

                <div className="m-0 p-0"></div>
                <div className=" font-[Cairo] flex flex-col justify-center items-center gap-2 w-full ">
                  <hr className=" w-full h-1 bg-gradient-to-r from-zinc-200 via-zinc-900 to-zinc-200" />
                  <ShareProfile />
                </div>
              </div>
            </Smf_Modal>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default User_Card;
