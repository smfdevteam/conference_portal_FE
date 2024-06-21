import { useContext, useEffect, useState } from "react";
import { getAlertsandHappenNow } from "../../Api/conference_meta.service";
import Alert from "../../Components/Alert/Alert";
import SMF_Tech from "../../Components/SMF_Tech";
import Now from "../../Components/happen_now/Now";
import Request_Help from "../../Components/help/Request_Help";
import User_Card from "../../Components/user/User_Card";
import { stateProvider } from "../../Context/App_Context";
import Leader_badge from "../../Components/Leader_badge/Leader_badge";
import Basic_Navigator from "../../Components/BasicNavigator/Basic_Navigator";
import Guest_Home from "../../Components/Points/GuestHome/Guest_Home";

export default function Home() {
  const {
    app_state: {
      user: { isLeader, pointId, points },
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
      {isLeader && <Leader_badge />}
      <SMF_Tech />
      <User_Card />
      <Basic_Navigator />
      <Request_Help />
      <div className="border-2 rounded-xl shadow-xl p-3 border-yellow-500">
        <p>
          انا عندي
          <span className="text-purple-900 text-3xl mx-3">{points}</span>
          نقطة
        </p>
        <p dir="ltr" className="text-3xl">
          Points ID :<span className="text-purple-900 text-4xl">{pointId}</span>
        </p>
        <p className="text-sm font-bold">
          لما الليدر يسألك علي ال ID الخاص بيك مليه الكود ده
        </p>
      </div>
      <Guest_Home />
    </>
  );
}
