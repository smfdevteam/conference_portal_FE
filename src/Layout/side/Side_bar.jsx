import { useContext } from "react";
import "./aside.css";
import { stateProvider } from "../../Context/App_Context";
import { Divider, Image } from "@nextui-org/react";
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
          <div className="x_line line1"></div>
          <div className="x_line line2"></div>
        </div>
      </div>
      <ul className="items text-center">
        {links.map((link, index) => {
          return (
            <li
              key={link}
              className={app_state.isAsideOpen && "enter-animation"}
              style={{
                animationDelay: `${app_state.isAsideOpen && index * 0.25}s`,
              }}
            >
              {link}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Side_bar;
