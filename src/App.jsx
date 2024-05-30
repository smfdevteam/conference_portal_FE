import { onMessage } from "firebase/messaging";
import { Suspense, lazy, useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { getLookups } from "./Api/conference_meta.service";
import "./App.css";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Full_Screen_Skeleton_Loader from "./Components/shared/Full_Screen_Skeleton_Loader";
import { stateProvider } from "./Context/App_Context";
import Layout from "./Layout/Layout";
import { CONFERENCE_FIREBASE_MESSAGEING_HANDLER } from "./firebase/firebase.config";
import Home from "./pages/Home/Home";
import Hymns from "./pages/Hymns/Hymns";
import NotFound from "./pages/NotFound";
import NotMobile from "./pages/NotMobile";
import Team from "./pages/Team/Team";
import { handleNotifications, isMobile } from "./utils/client";

const Location = lazy(() => import("./pages/Location"));
const Bible = lazy(() => import("./pages/Bible/Bible"));
const Bible_main = lazy(() => import("./Components/bible/Bible_main"));
const Bible_content = lazy(() => import("./Components/bible/Bible_content"));
const Bible_search = lazy(() =>
  import("./Components/bible/Bible_search/Bible_search")
);

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
          <Suspense fallback={<Full_Screen_Skeleton_Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/hymns" element={<Hymns />} />
              <Route path="/team" element={<Team />} />
              <Route path="/location" element={<Location />} />
              <Route path="/bible" element={<Bible />}>
                <Route index element={<Bible_main />} />
                <Route path=":language" element={<Bible_content />} />
                <Route path="search" element={<Bible_search />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </>
    );
  } else {
    return <NotMobile />;
  }
}

export default App;
