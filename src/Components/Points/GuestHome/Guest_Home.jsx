import { useContext, useEffect, useState } from "react";
import { stateProvider } from "../../../Context/App_Context";
import { getTeambyId } from "../../../Api/team.service";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/react";

const Guest_Home = () => {
  const {
    app_state: {
      user: { teamName, teamId },
    },
  } = useContext(stateProvider);
  const [team, setTeam] = useState();
  const [isLoading, setIsLoading] = useState();
  const getTeamInfo = async () => {
    setIsLoading(true);
    try {
      const team = await getTeambyId(teamId);
      setTeam(team);
    } catch (e) {
      toast.error("حصل حاجة غلط و احنا بنجيب بيانات الفريق");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (teamName) {
      getTeamInfo();
    }
  }, []);
  if (isLoading)
    return (
      <div className="flex justify-center items-center my-4">
        <Spinner color="secondary" />
      </div>
    );
  return (
    <>
      <p className="text-center">بيانات فريقي</p>
      {team ? (
        <div
          className="border-2 text-center rounded-xl shadow-xl p-3  my-3"
          style={{
            border: `1px solid ${team.color}`,
          }}
        >
          <p>
            الفريق
            <span className="text-purple-900 text-center text-3xl mx-1">
              ( {teamName} )
            </span>
          </p>
          <p>
            عندكم
            <span className="text-purple-900 text-6xl mx-3">{team.points}</span>
            نقط
          </p>
        </div>
      ) : (
        <p className="text-center">انت لسة مشتركتش في فريق</p>
      )}
    </>
  );
};

export default Guest_Home;
