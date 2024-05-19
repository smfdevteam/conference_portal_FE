import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Hymns from "./pages/Hymns/Hymns";
import Layout from "./Layout/Layout";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import NotMobile from "./pages/NotMobile";
import NotFound from "./pages/NotFound";
import { handleNotifications, isMobile } from "./utils/client";
import App_Context from "./App_Context";
import { useEffect, useState } from "react";
import { CONFERENCE_FIREBASE_MESSAGEING_HANDLER } from "./firebase/firebase.config";
import { getToken, onMessage } from "firebase/messaging";
import toast, { Toaster } from "react-hot-toast";
function App() {
  onMessage(CONFERENCE_FIREBASE_MESSAGEING_HANDLER, (payload) => {
    console.log(payload, "NOTIFICATION");
  });
  useEffect(() => {
    handleNotifications();
  }, []);

  // Redirect if not a mobile device
  // if (isMobile()) {
  return (
    <App_Context>
      <Toaster
        position="bottom-center"
        reverseOrder={true}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            color: "black",
            width:'150px',
            fontWeight:'500'
          },
        }}
      />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="hymns" element={<Hymns />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </App_Context>
  );
  // } else {
  //   return <></>;
  // }
}

export default App;
