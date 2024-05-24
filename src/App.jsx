import { onMessage } from "firebase/messaging";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { stateProvider } from "./Context/App_Context";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Layout from "./Layout/Layout";
import { CONFERENCE_FIREBASE_MESSAGEING_HANDLER } from "./firebase/firebase.config";
import Home from "./pages/Home/Home";
import Hymns from "./pages/Hymns/Hymns";
import NotFound from "./pages/NotFound";
import NotMobile from "./pages/NotMobile";
import { handleNotifications, isMobile } from "./utils/client";
import Team from "./pages/Team/Team";
import { getLookups } from "./Api/conference_meta.service";
import Location from "./pages/Location";
import Bible from "./pages/Bible/Bible";
import Bible_main from "./Components/bible/Bible_main";
import Bible_content from "./Components/bible/Bible_content";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
function App() {
  const { app_state, setAppState } = useContext(stateProvider);

  onMessage(CONFERENCE_FIREBASE_MESSAGEING_HANDLER, (payload) => {
    console.log(payload, "NOTIFICATION");
  });

  const getLookUpsData = async () => {
    const lookups = await getLookups();
    setAppState((prev) => {
      return { ...prev, conference: { ...lookups } };
    });
  };

  useEffect(() => {
    getLookUpsData();
    handleNotifications();
  }, []);

  // Redirect if not a mobile device
  if (isMobile()) {
    return (
      <>
        <Layout>
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
                width: "150px",
                fontWeight: "500",
              },
            }}
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hymns" element={<Hymns />} />
            <Route path="/team" element={<Team />} />
            <Route path="/location" element={<Location />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/bible" element={<Bible />}>
            
            
              <Route index element={<Bible_main />} />
              <Route path=":language" element={<Bible_content />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </>
    );
  } else {
    return <NotMobile />;
  }
}

export default App;
