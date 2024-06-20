import smfTechLogo from "../../assets/images/brand/smftecttypo.png";
import badgeIcon from "../../assets/images/icons/badge.png";
import smfLogo from "../../assets/images/brand/familyLogo-removebg-preview (1).png";
import { useNavigate } from "react-router-dom";
const Leader_badge = () => {
  const navigate = useNavigate();
  return (
    <div
      className="shadow-lg my-4"
      dir="ltr"
      onClick={() => navigate("/points")}
    >
      <div className="bg-black rounded-xl">
        <div className="flex items-center p-3 justify-between ">
          <img width={50} src={smfLogo} alt="" />
          <img width={50} src={badgeIcon} alt="" />
          <img width={50} src={smfTechLogo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Leader_badge;
