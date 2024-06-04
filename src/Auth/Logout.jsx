import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { stateProvider } from "../Context/App_Context";

const Logout = () => {
  const navigate = useNavigate();
  const { setAppState } = useContext(stateProvider);

  useEffect(() => {
    localStorage.clear();
    setAppState({
      isLogged: false,
      isLoading: false,
      user: {},
      conference: {},
      isAsideOpen: false,
    });
    navigate('/login')
  });
  return <></>;
};

export default Logout;
