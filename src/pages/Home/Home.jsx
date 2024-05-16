import React, { useContext, useEffect } from "react";
import { stateProvider } from "../../App_Context";
import Team from "../Team/Team";

export default function Home() {
  // const { app_state , setAppState } = useContext(stateProvider);
  // useEffect(()=>{
  //   setInterval(()=>{
  //     setAppState({app_state : Date.now()})
  //   } , 1000)
  // },[])
  return <Team/>;
}
