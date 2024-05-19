import { useEffect, useState } from "react";
import Alert from "../../Components/Alert/Alert";
import { getAlertsandHappenNow } from "../../Api/conference_meta.service";

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
    getHomeState()
  }, []);
  return (
    <>
      <Alert alert={homeState.alert} />
    </>
  );
}
