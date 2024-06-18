import { useContext, useEffect, useState } from "react";
import { getAlertsandHappenNow } from "../../Api/conference_meta.service";
import Alert from "../../Components/Alert/Alert";
import SMF_Tech from "../../Components/SMF_Tech";
import Now from "../../Components/happen_now/Now";
import Request_Help from "../../Components/help/Request_Help";
import User_Card from "../../Components/user/User_Card";
import { stateProvider } from "../../Context/App_Context";
import Leader_badge from "../../Components/Leader_badge/Leader_badge";

export default function Home() {
  const {
    app_state: {
      user: { isLeader, displayName },
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
      <Request_Help />
      <iframe
        title="map"
        className="my-3"
        src="https://www.youtube.com/embed/6aUhm9YNtE0?si=k1Pq2Nk10lBBWl9Q"
        style={{
          borderRadius: "21px",
          height: "200px",
          width: "100%",
        }}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
        loading="lazy"
      ></iframe>
    </>
  );
}
