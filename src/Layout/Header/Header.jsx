import { useContext } from "react";
import { stateProvider } from "../../Context/App_Context";
import smf_tech_logo from "../../assets/images/brand/smftech.png";
import burgerMenuIcon from "../../assets/images/icons/burgermenu.png";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
} from "@nextui-org/react";
export default function Header() {
  const { app_state, setAppState } = useContext(stateProvider);
  const handleIsSideOpen = () => {
    setAppState({ ...app_state, isAsideOpen: !app_state.isAsideOpen });
  };
  return (
    app_state.isLogged && (
      <Navbar dir="ltr" className="m-auto my-2 border-2 rounded-xl">
        <NavbarBrand>
          <Avatar
            isBordered
            color="primary"
            src={app_state.conference.logoUrl}
          />
        </NavbarBrand>
        <Avatar
          imgProps={{
            style: {
              objectFit: "contain",
            },
          }}
          isBordered
          color="primary"
          onClick={handleIsSideOpen}
          src={app_state.user.photoURL}
        />
      </Navbar>
    )
  );
}
