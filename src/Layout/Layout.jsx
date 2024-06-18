import Header from "./Header/Header";
import Side_bar from "./side/Side_bar";
import homeIcon from "../assets/images/icons/home.png";
import { useNavigate } from "react-router-dom";
export default function Layout({ children, app_state }) {
  const navigate = useNavigate();
  return (
    <section className="w-[95%] m-auto">
      <Header />
      <Side_bar />
      <div className="bg-white border-1 rounded-lg shadow-md p-5 relative">
        {children}
      </div>
      {/* <Footer/> */}
      {app_state?.isLogged && (
        <div
          onClick={() => navigate("/")}
          className=" my-5 flex justify-center items-center border-1 rounded-lg py-3 w-[80%] m-[auto]"
        >
          <img src={homeIcon} width={30} alt="" />
        </div>
      )}
    </section>
  );
}
