import { User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTheTop } from "../../Api/team.service";
import {CircularProgress} from "@nextui-org/react";
import toast from "react-hot-toast";
const Top_Achievers = () => {
  const [top, setTop] = useState({
    members: [],
    teams: [],
  });
  const [isLoading , setIsLoading] = useState(false)
  const getTop = async () => {
    try {
      setIsLoading(true)
      const { members, teams } = await getTheTop();
      setTop((prevState) => ({ ...prevState, members, teams }));
    } catch(e) {
      toast.error('حصل مشكلة و احنا بنجيب بيانات اعلي النقط')
    } finally {
      setIsLoading(false)
    }
  };
  useEffect(() => {
    getTop();
  }, []);
  if(isLoading) return <CircularProgress className="m-auto my-5" color="secondary" aria-label="Loading..."/>
  return (
    <div className="border-2 text-center rounded-xl shadow-xl p-3  my-3">
      <p className="text-3xl my-4">أصحاب اعلي النقط</p>
      {top.teams.length > 0 ? (
        <>
          <div className="grid grid-cols-2">
            <div className="members">
              <p className="text-2xl">أشخاص </p>
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
                            <Link
                              size="lg"
                              className="text-purple-700"
                              isExternal
                            >
                              {points} points
                            </Link>
                            <Link
                              size="lg"
                              isExternal
                              className="text-yellow-400"
                            >
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
              <p className="text-2xl">فرق</p>
              <div
                dir="ltr"
                className="max-h-[230px] overflow-y-scroll flex flex-col justify-center items-center"
              >
                {top.teams.map(({ name, points }, index) => (
                  <div
                    className="grid grid-cols-5 w-full items-center justify-center"
                    key={name}
                  >
                    <p className="col-span-1 text-left text-2xl">{index + 1}</p>
                    <div className="col-span-3">
                      <p className="text-lg text-purple-700">{name}</p>
                      <p className="text-yellow-600 font-bold">{points}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <p className="text-2xl">أشخاص </p>
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
                          <Link
                            size="lg"
                            className="text-purple-700"
                            isExternal
                          >
                            {points} points
                          </Link>
                          <Link
                            size="lg"
                            isExternal
                            className="text-yellow-400"
                          >
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
        </>
      )}
    </div>
  );
};

export default Top_Achievers;
