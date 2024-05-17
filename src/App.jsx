import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Hymns from "./pages/Hymns/Hymns";
import Layout from "./Layout/Layout";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import NotMobile from "./pages/NotMobile";
import NotFound from "./pages/NotFound";
import { isMobile } from "./utils/client";
import App_Context from "./App_Context";
import { getConferenceSpeakers } from "./Api/conference_meta.service";
function App() {
  // Redirect if not a mobile device
  if (isMobile()) {
    return (
      <App_Context>
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
    return <NotMobile />;
  }
}

export default App;
