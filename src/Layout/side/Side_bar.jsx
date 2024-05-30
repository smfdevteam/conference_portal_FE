import { Avatar, Image } from "@nextui-org/react";
import { useContext, useState } from "react";
import { stateProvider } from "../../Context/App_Context";
import logo from "../../assets/images/brand/smftecttypo.png";
import person from "../../assets/images/team/samaan.png";
import editIcon from "../../assets/images/icons/edit.png";
import "./aside.css";
import { useNavigate } from "react-router-dom";

const links = [
  { name: "الرئيسية", link: "/" },
  { name: "المتكلمين", link: "/speakers" },
  { name: "مكاننا", link: "/location" },
  { name: "ملفات", link: "/material" },
  { name: "الشعار", link: "/song" },
  { name: "البرنامج", link: "/program" },
  { name: "الكتاب المقدس", link: "/bible" },
];
const userLinks = ["بروفايلي", "الإعدادات", "أسرة مارمرقس", "ملاحظاتي" , "تسجيل الخروج"];
const Side_bar = () => {
  const navigate = useNavigate()
  const { app_state, setAppState } = useContext(stateProvider);
  const [isUserActive, setIsUserActive] = useState(false);
  const handleUserActive = () => setIsUserActive(!isUserActive);
  const handleIsSideOpen = () => {
    setAppState({ ...app_state, isAsideOpen: !app_state.isAsideOpen });
  };
  
  const navigateTo = (link) => {
    navigate(link)
    handleIsSideOpen()
  };
  
  return (
    <aside className={`smf_aside ${app_state.isAsideOpen && " show_side"} `}>
      <div className="flex justify-between m-10">
        <div className=" tabs flex py-4 me-5 border-1 font-semibold rounded-xl justify-between items-center text-white">
          <span
            onClick={handleUserActive}
            className={`${isUserActive && "active"}`}
          >
            Abanoub
          </span>
          <span
            onClick={handleUserActive}
            className={`${!isUserActive && "active"}`}
          >
          Cashback
          </span>
          <span
            className={`selector rounded-xl ${
              isUserActive ? " right" : "left"
            }`}
          ></span>
        </div>
        <div className="close" onClick={handleIsSideOpen}>
          <div
            className={`x_line line1 ${app_state.isAsideOpen && " rotateTop"}`}
            style={{
              animationDelay: `${links.length * 0.05}s`,
            }}
          ></div>
          <div
            className={`x_line line2 ${app_state.isAsideOpen && " rotateDown"}`}
            style={{
              animationDelay: `${links.length * 0.05}s`,
            }}
          ></div>
        </div>
      </div>
      <ul className="items text-center">
        {!isUserActive
          ? links.map((link, index) => {
              return (
                <li
                  key={link.name}
                  className={app_state.isAsideOpen && "enter-animation"}
                  onClick={()=>navigateTo(link.link)}
                  style={{
                    animationDelay: `${app_state.isAsideOpen && index * 0.1}s`,
                  }}
                >
                  {link.name}
                </li>
              );
            })
          : userLinks.map((link, index) => {
              return (
                <li
                  key={link}
                  className={app_state.isAsideOpen && "enter-animation"}
                  onClick={handleIsSideOpen}
                  style={{
                    animationDelay: `${app_state.isAsideOpen && index * 0.1}s`,
                  }}
                >
                  {link}
                </li>
              );
            })}
      </ul>
      {app_state.isAsideOpen && (
        <div
          className="smf_user"
          style={{
            outlineColor: isUserActive && "#0d2486",
          }}
        >
          <div
            onClick={handleUserActive}
            className={`smf_user-avatar  border-2 flex justify-center items-center w-full h-full shadow-lg object-fill rounded-full ${
              app_state.isAsideOpen && "enter-animation"
            }`}
          >
            <Avatar
              src={person}
              size="lg"
              className="relative w-full h-full"
              isBordered
              color={isUserActive ? "warning" : "default"}
            />
          </div>
        </div>
      )}
    </aside>
  );
};

export default Side_bar;
