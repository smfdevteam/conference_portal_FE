import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { stateProvider } from "../../Context/App_Context";
import ShareSvg from "../../assets/images/icons/share.svg";
import SMF_QR from "../QR/SMF_QR";
import ShareProfile from "../ShareProfile/ShareProfile";
import leaderBadge from "../../assets/images/icons/badge.png";
import Smf_Modal from "../shared/Smf_Modal";
const User_Card = () => {
  const navigate = useNavigate;
  const { app_state, setAppState } = useContext(stateProvider);
  
  const { displayName, email, photoURL, profile_views, isLeader,uid } =
    app_state.user;
  return (
    <Card dir="ltr" className={isLeader && "border-5 border-black"}>
      {isLeader && (
        <>
          <CardHeader className="flex justify-center">
            <Avatar
              imgProps={{
                style: {
                  objectFit: "cover",
                  width:'100%',
                  height:'100%'
                },
              }}
              isBordered
              color="primary"
              src={leaderBadge}
            />
          </CardHeader>
          <Divider />
        </>
      )}
      <CardHeader className="flex gap-3">
        <Avatar
          imgProps={{
            style: {
              objectFit: "cover",
            },
          }}
          isBordered
          color="primary"
          src={photoURL}
        />
        <div className="flex flex-col">
          <p className="text-xl font-bold capitalize">{displayName}</p>
          <p className="text-lg font-medium">{email}</p>
        </div>
      </CardHeader>
      <Divider />
      {profile_views > 0 && (
        <>
          <CardBody>
            <p className="capitalize">
              Profile viewed
              <span className="font-bold  text-warning mx-1">
                {profile_views}
              </span>
              times
            </p>
          </CardBody>
          <Divider />
        </>
      )}
      <CardFooter>
        <div className="flex justify-between items-center flex-1 gap-4">
          <div className="">
            <Link isExternal showAnchorIcon href={"/public/"+uid}>
              وريني بروفايلي
            </Link>
          </div>
          <div className="flex justify-center items-center ">
            <Smf_Modal isBtnImage btnImgClassNames={'w-[25px]'} btnImgSrc={ShareSvg}>
              <div className="flex flex-col justify-center items-center gap-1 text-xl   max-h-[85vh] ">
                <div className="flex flex-col justify-center items-center gap-1 font-[Cairo] ">
                  <Avatar
                    imgProps={{
                      style: {
                        objectFit: "cover",
                      },
                    }}
                    isBordered
                    alt="nextui logo"
                    src={photoURL}
                    className="w-20 h-20 text-large "
                    color="warning"
                  />
                  <p className="text-md ">{displayName}</p>
                  <p className="font-semibold">خلي صاحبك يعمل سكان هنا</p>
                  <SMF_QR link={`${window.location.origin}/public/${uid}`} />
                </div>

                <div className="m-0 p-0"></div>
                <div className=" font-[Cairo] flex flex-col justify-center items-center gap-2 w-full ">
                  <hr className="  w-full h-1 bg-gradient-to-r from-zinc-200 via-zinc-900 to-zinc-200" />
                  <ShareProfile userId={uid}/>
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
