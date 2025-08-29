import { useContext, useEffect, useState } from "react";
import { stateProvider } from "../../../Context/App_Context";
import { getTeambyId } from "../../../Api/team.service";
import toast from "react-hot-toast";
import { Divider, Spinner } from "@heroui/react";
import { User, Link } from "@heroui/react";
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
      <p className="text-center font-bold text-2xl">بيانات الفريق</p>
      {team ? (
        <div
          className="border-2 text-center rounded-xl shadow-xl p-3  my-3"
          style={{
            border: `1px solid ${team.color}`,
          }}
        >
          <p>
            فريقي
            <span className="text-purple-900 text-center text-3xl mx-1">
              ( {teamName} )
            </span>
          </p>
          {team.points &&           
          <p>
            عندكم
            <span className="text-purple-900 text-6xl mx-3">{team.points}</span>
            نقط
          </p>
          }
          {team.members && (
            <>
              <p className="font-bold text-2xl">فريقي</p>
              <Divider className="my-2"/>
              <div dir="ltr" className="grid grid-cols-2 justify-start max-h-[200px] overflow-y-scroll">
                {team.members.map(({ displayName, photoURL }) => (
                  <User
                    dir="ltr"
                    key={displayName}
                    name={displayName}
                    className="w-full my-2 justify-start"
                    description={
                      <Link
                        size="sm"
                        isExternal
                        color={team.color}
                      >
                        {teamName}
                      </Link>
                    }
                    avatarProps={{
                      src: photoURL,
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <p className="text-center">انت لسة مشتركتش في فريق</p>
      )}
    </>
  );
};

export default Guest_Home;
