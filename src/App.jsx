import { onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import App_Context from "./App_Context";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Layout from "./Layout/Layout";
import { CONFERENCE_FIREBASE_MESSAGEING_HANDLER } from "./firebase/firebase.config";
import Home from "./pages/Home/Home";
import Hymns from "./pages/Hymns/Hymns";
import NotFound from "./pages/NotFound";
import NotMobile from "./pages/NotMobile";
import { handleNotifications, isMobile } from "./utils/client";

function App() {

  onMessage(CONFERENCE_FIREBASE_MESSAGEING_HANDLER, (payload) => {
    console.log(payload, "NOTIFICATION");
  });

  useEffect(() => {
    handleNotifications();
  }, []);

  // Redirect if not a mobile device
  if (isMobile()) {
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
  } else {
    return <NotMobile/>;
  }
}

export default App;
