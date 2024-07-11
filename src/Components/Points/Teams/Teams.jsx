import React, { useEffect, useState } from "react";
import { getTeams } from "../../../Api/team.service";
import toast from "react-hot-toast";
import Full_Screen_Skeleton_Loader from "../../shared/Full_Screen_Skeleton_Loader";
import Team_Card from "./Team_Card";
import Team_QR from "./Team_QR";

const Teams = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const getAllTeams = async () => {
    setIsLoading(true);
    try {
      const teams = await getTeams();
      setTeams(teams);
    } catch (e) {
      toast.error("حصل غلط و احنا بنجيب الفرق حاول تاني");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllTeams();
  }, []);
  if (isLoading) return <Full_Screen_Skeleton_Loader />;
  return teams.length > 0 ? (
    <>
      <p>أضغط علي الفريق و اتحكم في النقط و الترتيب</p>
      <div className="flex gap-3 overflow-x-scroll">
        {teams.map((team) => (
          <div className="flex flex-col" key={team.teamId}>
            <Team_Card team={team} getAllTeams={getAllTeams} />
            <Team_QR teamId={team.teamId} teamName={team.name} />
          </div>
        ))}
      </div>
    </>
  ) : (
    <p className="text-2xl text-center">لا يوجد فرق حاليا</p>
  );
};

export default Teams;
