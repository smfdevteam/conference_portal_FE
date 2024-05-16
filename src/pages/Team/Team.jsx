import { useState } from "react";
import { SmfTechTeam } from "../../assets/data/team";
import Smf_Modal from "../../Components/shared/Smf_Modal";
import smf_tech_logo from "../../assets/images/brand/smftech.png";
import smf_tech_logo_type from "../../assets/images/brand/smftecttypo.png";
import { Image } from "@nextui-org/react";
import Member from "./Member";

const gradientStyle = {
  background: "radial-gradient(circle at 50% 50%, #8255f1, #0d2486)",
};
const Team = () => {
  return (
    <div className="rounded-md pb-10 text-white" style={gradientStyle}>
      <div className="grid grid-cols-2 items-center justify-center">
        <Image src={smf_tech_logo_type} />
        <Image src={smf_tech_logo} />
      </div>
      <div className="my-3 m-auto">
        <p className="text-3xl font-bold text-center">Meet SMF Tech. Leaders</p>
        <p className="text-xl w-[85%] mx-auto mb-3 text-center">
          Home of Brilliant Minds Crafting Creativity
        </p>
        <div className="w-[80%] grid grid-cols-2 gap-3 m-auto">
          {SmfTechTeam.map((member) => (
            <Member key={member.name} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
