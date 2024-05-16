import { useState } from "react";
import { SmfTechTeam } from "../assets/data/team";
import Smf_Modal from "../Components/shared/Smf_Modal";

const Team = () => {
  const [selectedMember, setSelectedMember] = useState({});
  const handleMemberSelect = (member) => {
    setSelectedMember(member);
  };
  return (
    //!!! TODO
    <div>
        Team
    </div>
  );
};

export default Team;
