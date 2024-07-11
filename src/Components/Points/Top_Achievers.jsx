import { useEffect, useState } from "react";
import { getTheTop } from "../../Api/team.service";
import { User } from "@nextui-org/react";
import { Link } from "react-router-dom";
import smfTechLogo from '../../assets/images/brand/smftech.png'
const Top_Achievers = () => {
  const [top, setTop] = useState({
    members: [],
    teams: [],
  });
  const getTop = async () => {
    const { members, teams } = await getTheTop();
    setTop((prevState) => ({ ...prevState, members, teams }));
  };
  useEffect(() => {
    getTop();
  }, []);
  return (
    <div className="border-2 text-center rounded-xl shadow-xl p-3  my-3">
      <p className="text-3xl">Top Achievers</p>
      <div className="grid grid-cols-2">
        <div className="members">
          <p className="text-3xl">Members</p>

          <div dir="ltr" className="h-[230px] overflow-y-scroll">
            {top.members.map(
              ({ displayName, photoURL, points, teamName }, index) => (
                <div className="flex items-center gap-3" key={teamName}>
                  <p>{index + 1}</p>
                  <User
                    dir="ltr"
                    key={displayName}
                    name={displayName.split(" ")[0]}
                    className="w-full my-2 justify-start"
                    description={
                      <div className="flex flex-col">
                        <Link size="lg" className="text-purple-700" isExternal>
                          {points} points
                        </Link>
                        <Link size="lg" isExternal className="text-yellow-400">
                          {teamName}
                        </Link>
                      </div>
                    }
                    avatarProps={{
                      src: photoURL,
                    }}
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className="teams">
          <p className="text-3xl">Teams</p>
          <div
            dir="ltr"
            className="max-h-[230px] overflow-y-scroll flex flex-col justify-center items-center"
          >
            {top.teams.map(({ name, points }) => (
              <User
                dir="ltr"
                key={name}
                name={name}
                className="w-full my-2 justify-start"
                description={
                  <div className="flex flex-col">
                    {points && (
                      <Link size="lg" className="text-purple-700" isExternal>
                        {points} points
                      </Link>
                    )}
                  </div>
                }
                avatarProps={{
                    src : smfTechLogo
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top_Achievers;
