import { onMessage } from "firebase/messaging";
import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useNavigate } from "react-router-dom";
import { silentLogin } from "./Api/auth.service";
import { getLookups } from "./Api/conference_meta.service";
import "./App.css";
import Login from "./Auth/Login/Login";
import Logout from "./Auth/Logout";
import Register from "./Auth/Register/Register";
import Full_Screen_Skeleton_Loader from "./Components/shared/Full_Screen_Skeleton_Loader";
import { stateProvider } from "./Context/App_Context";
import Layout from "./Layout/Layout";
import { CONFERENCE_FIREBASE_MESSAGEING_HANDLER } from "./firebase/firebase.config";
import Home from "./pages/Home/Home";
import Hymns from "./pages/Hymns/Hymns";
import NotFound from "./pages/NotFound";
import NotMobile from "./pages/NotMobile";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Team from "./pages/Team/Team";
import User from "./pages/User/User";
import { isMobile } from "./utils/client";
import { ErrorBoundary } from "react-error-boundary";
import UnExpected_Error from "./Components/shared/UnExpected_Error";

const Location = lazy(() => import("./pages/Location"));
const Material = lazy(() => import("./pages/material/Material"));
const Bible = lazy(() => import("./pages/Bible/Bible"));
const Bible_main = lazy(() => import("./Components/bible/Bible_main"));
const Bible_content = lazy(() => import("./Components/bible/Bible_content"));
const Bible_search = lazy(() =>
  import("./Components/bible/Bible_search/Bible_search")
);

function App() {
  const { app_state, setAppState } = useContext(stateProvider);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
    silentLogin(setIsLoading, setAppState, navigate);
    getLookUpsData();
  }, []);

  // Redirect if not a mobile device
  if (isLoading) return <Full_Screen_Skeleton_Loader />;
  if (isMobile()) {
    return (
      <ErrorBoundary fallbackRender={UnExpected_Error}>
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
              {app_state.isLogged ? (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/resetpassword" element={<ResetPassword />} />
                  <Route path="/hymns" element={<Hymns />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/materials" element={<Material />} />
                  <Route path="/settings" element={<User />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/bible" element={<Bible />}>
                    <Route index element={<Bible_main />} />
                    <Route path=":language" element={<Bible_content />} />
                    <Route path="search" element={<Bible_search />} />
                  </Route>
                </>
              ) : (
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
              )}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    );
  } else {
    return <NotMobile />;
  }
}

export default App;
