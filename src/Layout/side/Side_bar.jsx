import { Avatar } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stateProvider } from "../../Context/App_Context";
import "./aside.css";

const links = [
  { name: "الرئيسية", link: "/" },
  { name: "الكتاب المقدس", link: "/bible" },
  { name: "الترانيم", link: "/hymns" },
  { name: "المتكلمين", link: "/speakers" },
  { name: "احنا فين ؟", link: "/location" },
  { name: "البرنامج", link: "/program" },
];
const userLinks = [
  { name: "بروفايلي", link: "/settings" },
  { name: "ملاحظاتي", link: "/notes" },
  { name: "ملفاتي", link: "/materials" },
  { name: "تسجيل الخروج", link: "/logout" },
];
const Side_bar = () => {
  const navigate = useNavigate();
  const { app_state, setAppState } = useContext(stateProvider);
  const [isUserActive, setIsUserActive] = useState(false);
  const handleUserActive = () => setIsUserActive(!isUserActive);
  const handleIsSideOpen = () => {
    setAppState({ ...app_state, isAsideOpen: !app_state.isAsideOpen });
  };

  const navigateTo = (link) => {
    navigate(link);
    handleIsSideOpen();
  };

  return (
    <aside className={`smf_aside ${app_state.isAsideOpen && " show_side"} `}>
      <div className="flex justify-between m-10">
        <div className=" tabs flex py-4 me-5 border-1 font-semibold rounded-xl justify-between items-center text-white">
          <span
            onClick={handleUserActive}
            className={`${isUserActive && "active"} truncate capitalize`}
          >
            الأكونت
          </span>
          <span
            onClick={handleUserActive}
            className={`${!isUserActive && "active"} w-fit`}
          >
            المؤتمر
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
                  onClick={() => navigateTo(link.link)}
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
                  key={link.name}
                  className={app_state.isAsideOpen && "enter-animation"}
                  onClick={() => navigateTo(link.link)}
                  style={{
                    animationDelay: `${app_state.isAsideOpen && index * 0.1}s`,
                  }}
                >
                  {link.name}
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
              src={app_state.user.photoURL}
              size="lg"
              className="relative w-full h-full"
              isBordered
              imgProps={{
                style: {
                  objectFit: "cover",
                },
              }}
              color={isUserActive ? "warning" : "default"}
            />
          </div>
        </div>
      )}
    </aside>
  );
};

export default Side_bar;
