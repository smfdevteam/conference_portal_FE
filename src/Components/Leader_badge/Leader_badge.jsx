import { useNavigate } from "react-router-dom";
import smfLogo from "../../assets/images/brand/familyLogo-removebg-preview (1).png";
import smfTechLogo from "../../assets/images/brand/smftecttypo.png";
const Leader_badge = ({label , route}) => {
  const navigate = useNavigate();
  return (
    <div
      className="shadow-lg my-4"
      dir="ltr"
      onClick={() => navigate(route)}
    >
      <div className="bg-black rounded-xl border-3 border-white">
        <p className="text-white text-3xl text-center py-3">{label}</p>
        <div className="flex items-center p-3 justify-between ">
          <img width={50} src={smfLogo} alt="" />
          <img width={50} src={smfTechLogo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Leader_badge;
