import { Avatar, Image, Navbar, NavbarBrand } from "@nextui-org/react";
import { useContext } from "react";
import { stateProvider } from "../../Context/App_Context";
import { Badge } from "@nextui-org/react";
import messageIcon from "../../assets/images/icons/message.png";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const { app_state, setAppState } = useContext(stateProvider);
  const handleIsSideOpen = () => {
    setAppState({ ...app_state, isAsideOpen: !app_state.isAsideOpen });
  };
  return (
    app_state.isLogged && (
      <Navbar dir="ltr" className="m-auto my-2 border-2 rounded-xl">
        <NavbarBrand>
          <Avatar
            onClick={() => navigate("/")}
            isBordered
            color="primary"
            src={app_state.conference.logoUrl}
          />
        </NavbarBrand>
        <Badge
          color="danger"
          className="text-xl w-[25px] h-[25px]"
          placement="top-left"
          content={app_state.user_messages > 9 ? "+9" : app_state.user_messages}
          shape="circle"
          onClick={() => navigate("/msgs")}
        >
          <img src={messageIcon} width={30} />
        </Badge>
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
