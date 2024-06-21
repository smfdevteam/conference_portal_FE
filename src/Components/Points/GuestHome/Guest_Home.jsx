import { useContext, useEffect, useState } from "react";
import { stateProvider } from "../../../Context/App_Context";
import { getTeambyId } from "../../../Api/team.service";

const Guest_Home = () => {
  const {
    app_state: {
      user: { teamName, teamId },
    },
  } = useContext(stateProvider);
  const [team, setTeam] = useState();
  const getTeamInfo = async () => {
    const team = await getTeambyId(teamId);
    setTeam(team)
  };

  useEffect(() => {
    if (teamName) {
      getTeamInfo();
    }
  }, []);
  return (
    team && (
      <div className="border-2 rounded-xl shadow-xl p-3  my-3" style={{
        border:`1px solid ${team.color}`
      }}>
        <p>
            الفريق
          <span className="text-purple-900 text-center text-3xl mx-1">
            {teamName}
          </span>
        </p>
        <p>
          عندنا
          <span className="text-purple-900 text-3xl mx-3">{team.points}</span>
          نقطة
        </p>
      </div>
    )
  );
};

export default Guest_Home;
