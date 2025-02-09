import fileIcon from "../../assets/images/icons/file.png";
import songIcon from "../../assets/images/icons/song.png";
import rulesIcon from "../../assets/images/icons/rules.png";
import leadersIcon from "../../assets/images/icons/leaders.png";
import cashBackIcon from "../../assets/images/icons/cashback.png";
import smf from "../../assets/images/brand/familyLogo-removebg-preview (1).png";
import { useNavigate } from "react-router-dom";
import Feedback from "../feedback/Feedback";
const Basic_Navigator = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="my-5 grid grid-cols-3 justify-center items-center">
        <div
          onClick={() => navigate("/materials")}
          className="flex flex-col hover:translate-y-[-5px] hover:scale-110 transition items-center justify-center"
        >
          <img src={fileIcon} width={30} alt="" />
          <p>ملفاتي</p>
        </div>
        <div
          onClick={() => navigate("/host")}
          className="flex flex-col hover:translate-y-[-5px] hover:scale-110 transition items-center justify-center"
        >
          <img src={smf} width={40} alt="" />
          <p>اسرة مارمرقس</p>
        </div>
        <div
          onClick={() => navigate("/song")}
          className="flex flex-col hover:translate-y-[-5px] hover:scale-110 transition items-center justify-center"
        >
          <img src={songIcon} width={30} alt="" />
          <p>الشعار</p>
        </div>
        <div
          onClick={() => navigate("/leaders")}
          className="flex flex-col hover:translate-y-[-5px] hover:scale-110 transition items-center justify-center"
        >
          <img src={leadersIcon} width={30} alt="" />
          <p>الخدام</p>
        </div>
        <div
          onClick={() => navigate("/rules")}
          className="flex flex-col hover:translate-y-[-5px] hover:scale-110 transition items-center justify-center"
        >
          <img src={rulesIcon} width={30} alt="" />
          <p>القواعد</p>
        </div>
        <div
          onClick={() => navigate("/points-overview")}
          className="flex flex-col hover:translate-y-[-5px] hover:scale-110 transition items-center justify-center"
        >
          <img src={cashBackIcon} width={30} alt="" />
          <p>النقاط</p>
        </div>
      </div>
      <Feedback/>
    </>
  );
};

export default Basic_Navigator;

// Rules , Song , Files , SMF
