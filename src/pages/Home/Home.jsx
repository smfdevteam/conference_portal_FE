import { useContext, useEffect, useState } from "react";
import { getAlertsandHappenNow } from "../../Api/conference_meta.service";
import Alert from "../../Components/Alert/Alert";
import Basic_Navigator from "../../Components/BasicNavigator/Basic_Navigator";
import Leader_badge from "../../Components/Leader_badge/Leader_badge";
import SMF_Tech from "../../Components/SMF_Tech";
import Now from "../../Components/happen_now/Now";
import Request_Help from "../../Components/help/Request_Help";
import User_Card from "../../Components/user/User_Card";
import { stateProvider } from "../../Context/App_Context";
import SMFTech1 from "../../assets/images/brand/smftech.png";
import SMFTech2 from "../../assets/images/brand/familyLogo-removebg-preview (1).png";
import leadersBadge from "../../assets/images/icons/badge.png";
import { Divider, Image } from "@nextui-org/react";
export default function Home() {
  const {
    app_state: {
      user: { isLeader, pointId, points, displayName },
      conference: { name },
    },
  } = useContext(stateProvider);
  const [homeState, setHomeState] = useState({
    alert: "",
    now: "",
  });
  const getHomeState = async () => {
    const alertAndHappenNow = await getAlertsandHappenNow();
    const { alert, now } = alertAndHappenNow;
    setHomeState({
      alert,
      now,
    });
  };
  useEffect(() => {
    getHomeState();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center ms-[1rem]">
        <Alert alert={homeState.alert} />
        <h1 className="text-3xl  font-bold border-r-3 border-l-3 px-4">
          {name}
        </h1>
        <Now now={homeState.now} />
      </div>
      {isLeader && (
        <div className="border-black bg-slate-950 border-3 rounded-lg p-2 my-3">
          <p className="text-white text-center">
            Leader /<span className="text-3xl mx-3">{displayName.split(" ")[0]}</span>
          </p>
          <div className="grid grid-cols-2 gap-3 ">
            <Leader_badge label={"Teams"} route={"/points"} />
            <Leader_badge label={"Members"} route={"/points-guest"} />
          </div>
          <div className="flex items-center justify-center gap-5">
            <img src={leadersBadge} width={20} />
            <p className="text-white text-center capitalize">
              You Now Own the Leaders Badge
            </p>
            <img src={leadersBadge} width={20} />
          </div>
        </div>
      )}
      <SMF_Tech />
      <User_Card />
      <Basic_Navigator />
      <Request_Help />
      <div className="text-center  rounded-lg border-1 border-purple-600 shadow-lg">
        <div className="text-center  flex items-center justify-center ">
          <Image
            radius="lg"
            alt={""}
            className="w-full object-cover h-[140px]"
            src={SMFTech1}
          />
          <div>
            <p className="text-4xl ">EIKON</p>
            <Divider className="mb-2 bg-purple-950" />
            <p className="px-2">
              أول نظام إدارة المؤتمرات الكنسية في الكنيسة القبطية الارثوذكسية
            </p>
            <a href="tel:+201229689691" className="text-bold text-purple-800">
              للتواصل
            </a>
          </div>
        </div>
        <div className="flex gap-3 my-2 justify-center items-center ">
          <p className="font-semibold">
            رعاية أسرة مارمرقس لإعداد الخدام المغتربين
          </p>
          <Image radius="lg" alt={""} className="w-[30px]" src={SMFTech2} />
        </div>
      </div>
    </>
  );
}
