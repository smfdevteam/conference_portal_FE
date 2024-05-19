import { useEffect, useState } from "react";
import Alert from "../../Components/Alert/Alert";
import { getAlertsandHappenNow } from "../../Api/conference_meta.service";
import SMF_Tech from "../../Components/SMF_Tech";
import Now from "../../Components/happen_now/Now";
import User_Card from "../../Components/user/User_Card";
import SMF_QR from "../../Components/QR/SMF_QR";

export default function Home() {
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
        <Now now={homeState.now} />
      </div>
      <SMF_Tech />
      <User_Card />
      <iframe
        title="map"
        className="my-3"
        src='https://www.youtube.com/embed/6aUhm9YNtE0?si=k1Pq2Nk10lBBWl9Q'
        style={{
          borderRadius: "21px",
          height: "250px",
          width: "100%",
        }}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
        loading="lazy"
      ></iframe>
      {/* <SMF_QR/>  */}
    </>
  );
}
