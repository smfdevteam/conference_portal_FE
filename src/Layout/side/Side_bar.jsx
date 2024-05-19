import { Avatar, Image } from "@nextui-org/react";
import { useContext, useState } from "react";
import { stateProvider } from "../../Context/App_Context";
import logo from "../../assets/images/brand/smftecttypo.png";
import person from "../../assets/images/team/samaan.png";
import editIcon from "../../assets/images/icons/edit.png";
import "./aside.css";
const links = [
  "Home",
  "Profile",
  "Speakers",
  "Location",
  "Messages",
  "Material",
];
const userLinks = [
  "My Profile",
  "Settings",
  "Logout",

];
const Side_bar = () => {
  const { app_state, setAppState } = useContext(stateProvider);
  const handleIsSideOpen = () => {
    setAppState({ ...app_state, isAsideOpen: !app_state.isAsideOpen });
  };
  const [isUserActive, setIsUserActive] = useState(false);
  return (
    <aside className={`smf_aside ${app_state.isAsideOpen && " show_side"} `}>
      <div className="flex justify-end m-10">
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
      {app_state.isAsideOpen && 
      
      <div className="smf_user" style={{
        outlineColor : isUserActive && '#0d2486'
      }}>
        <div onClick={()=>setIsUserActive(!isUserActive)} className={`smf_user-avatar  border-2 flex justify-center items-center w-[100px] shadow-lg object-fill h-[100px] rounded-full ${app_state.isAsideOpen && "enter-animation"}`}>
          <Avatar src={person} size="lg"  className="relative w-full h-full" isBordered color={isUserActive ? "warning" : 'default'} />
        </div>
      </div>
      }
    </aside>
  );
};

export default Side_bar;
