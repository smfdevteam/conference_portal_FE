import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { joinGuestToTeam } from "../../../Api/team.service";
import { stateProvider } from "../../../Context/App_Context";
import Full_Screen_Skeleton_Loader from "../../shared/Full_Screen_Skeleton_Loader";
import teamImage from '../../../assets/images/team_joined.svg'
import smfTech from '../../../assets/images/brand/smftech.png'
const Join_to_team = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { teamId } = useParams();
  const {
    app_state: {
      user: { uid },
    },
  } = useContext(stateProvider);
  const jointToTeam = async () => {
    setIsLoading(true);
    try {
      await joinGuestToTeam(teamId, uid);
      toast.success('تمام')
    } catch (e) {
      toast.error("حصلت حاجة غلط اعمل ريفريش");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    jointToTeam();
  }, []);
  if (isLoading) return <Full_Screen_Skeleton_Loader />;
  return <div className="flex justify-center items-center flex-col">
    <img src={smfTech} className="rounded-lg"  width={100} alt="" />
    <img src={teamImage} className="rounded-lg"  alt="" />
  </div>;
};

export default Join_to_team;
