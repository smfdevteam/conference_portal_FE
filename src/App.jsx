import { Route, Routes } from "react-router-dom";
import "./App.css";
import { User , Link} from "@nextui-org/react";
import Home from "./Home/Home";
import Hymns from "./Hymns/Hymns";
import Layout from "./Layout/Layout";
import Login from "./Login/Login";
import Register from "./Register/Register";

function App() {
  // Function to check if the user agent is for a mobile device
    function isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Redirect if not a mobile device
    if (isMobile()) {
      return <>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='hymns' element={<Hymns/>}/>
            <Route path='*' element={<h2>404</h2>}/>
          </Routes>
        </Layout>
      </>
    }else{
      // window.location.replace("not_mobile.html"); // Redirect to a page indicating that the site is not accessible on non-mobile devices
    }
}

export default App;
