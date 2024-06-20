import fileIcon from "../../assets/images/icons/fileIcon.png";
import { Divider } from "@nextui-org/react";
import smfTechLogo from "../../assets/images/brand/smftecttypo.png";
import smfLogo from "../../assets/images/brand/familyLogo-removebg-preview (1).png";
import { Link } from "@nextui-org/react";
const Material_Card = ({url , fileSize , name}) => {
  return (
    <div
      dir="ltr"
      className="border-1 rounded-lg shadow-lg py-3 px-1"
      key={name}
    >
      <div
        className="p-1 rounded-lg  mb-1 flex items-center justify-between"
        style={{
          background: "radial-gradient(circle at 50% 50%, #8255f1, #0d2486)",
        }}
      >
        <div className="w-[15%]">
          <img src={smfLogo} alt="" />
        </div>
        <div className="w-[20%]">
          <img src={smfTechLogo} alt="" />
        </div>
      </div>
      <Divider />
      <header className="flex gap-2 items-center justify-between my-4">
        <div>
          <img src={fileIcon} width={40} alt="" />
        </div>
        <div className="w-[80%] truncate me-1">
          <p>{name}</p>
          <p className="text-xs">{fileSize}</p>
        </div>
      </header>
      <Divider />
      <Link
        className="mt-2 w-full"
        isExternal
        href={url}
        download
        showAnchorIcon
      >
        Download File
      </Link>
    </div>
  );
};

export default Material_Card
