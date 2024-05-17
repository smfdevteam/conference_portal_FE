import React, { useContext, useEffect } from "react";
import { stateProvider } from "../../App_Context";
import Team from "../Team/Team";
import Login from "../../Auth/Login/Login";
import { getLookups } from "../../Api/conference_meta.service";

export default function Home() {
  // const { app_state , setAppState } = useContext(stateProvider);
  useEffect(() => {}, []);
  return <Login />;
}
