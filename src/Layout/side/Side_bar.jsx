import { Image } from "@nextui-org/react";
import { useContext } from "react";
import { stateProvider } from "../../Context/App_Context";
import logo from "../../assets/images/brand/smftecttypo.png";
import "./aside.css";
const links = [
  "Home",
  "Profile",
  "Speakers",
  "Location",
  "Messages",
  "Material",
];
const Side_bar = () => {
  const { app_state, setAppState } = useContext(stateProvider);
  const handleIsSideOpen = () => {
    setAppState({ ...app_state, isAsideOpen: !app_state.isAsideOpen });
  };
  return (
    <aside className={`smf_aside ${app_state.isAsideOpen && " show_side"}`}>
      <div className="flex justify-end m-10">
        <div className="close" onClick={handleIsSideOpen}>
          <div
            className={`x_line line1 ${app_state.isAsideOpen && " rotateTop"}`}
            style={{
              animationDelay: `${links.length * 0.1}s`,
            }}
          ></div>
          <div
            className={`x_line line2 ${app_state.isAsideOpen && " rotateDown"}`}
            style={{
              animationDelay: `${links.length * 0.1}s`,
            }}
          ></div>
        </div>
      </div>
      <ul className="items text-center">
        {links.map((link, index) => {
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
      <div className="flex justify-center my-5">
        <Image className="m-auto" width={90} src={logo} />
      </div>
    </aside>
  );
};

export default Side_bar;
