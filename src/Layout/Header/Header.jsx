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
  const { app_state , setAppState } = useContext(stateProvider);
  const handleIsSideOpen = () => {
    setAppState({...app_state , isAsideOpen : !app_state.isAsideOpen})
  }
  return (
    <Navbar dir="ltr" className="m-auto my-2 border-2 rounded-xl">

      <NavbarBrand>
        <Avatar isBordered color="primary" src={app_state.conference.logoUrl} />
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="warning"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2" dir="">
              <p className="font-normal">تم تسجيل الدخول بالإيميل : </p>
              <p className="font-semibold text-left">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">إعداداتي</DropdownItem>
            <DropdownItem key="help_and_feedback">البروفايل</DropdownItem>
            <DropdownItem key="help_and_feedback" className="text-white font-bold" style={{
              background: "radial-gradient(circle at 50% 50%, #8255f1, #0d2486"
            }} dir="ltr">SMF Tech.</DropdownItem>
            <DropdownItem key="logout" color="danger">
              تسجيل الخروج
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Image onClick={handleIsSideOpen} src={burgerMenuIcon} width={45} />
      </NavbarContent>
    </Navbar>
  );
}
