import { Switch } from "@heroui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getTeams,
  isPointsShown,
  setIsOrderCustomApi,
  setIsOrderShownApi,
  setIsPointsShownApi,
  teamsConfig,
} from "../../../Api/team.service";
import Full_Screen_Skeleton_Loader from "../../shared/Full_Screen_Skeleton_Loader";
import Team_Card from "./Team_Card";
import Team_QR from "./Team_QR";
const Teams = () => {
  const [isPointsShownState, setIsPointsShown] = React.useState(null);
  const [isOrderCustom, setIsOrderCustom] = React.useState(null);
  const [isOrderShown, setIsOrderShown] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const handePointShown = async (value) => {
    try {
      toast.loading("ثواني");
      setIsPointsShown(!value);
      await setIsPointsShownApi(!value);
      toast.dismiss();
      toast.success("تمام");
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleOrderShown = async (value) => {
    try {
      toast.loading("ثواني");
      setIsOrderShown(!value);
      await setIsOrderShownApi(!value);
      toast.dismiss();
      toast.success("تمام");
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleOrderIsCustom = async (value) => {
    try {
      toast.loading("ثواني");
      setIsOrderCustom(!value);
      await setIsOrderCustomApi(!value);
      toast.dismiss();
      toast.success("تمام");
    } catch (e) {
      toast.error(e.message);
    }
  };

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
  const getTeamsConfig = async () => {
    try {
      const { isTeamOrderShown, isTeamPointsShown, isTeamsCustomOrder } =
        await teamsConfig();
      setIsPointsShown(isTeamPointsShown.isShown);
      setIsOrderCustom(isTeamsCustomOrder.isCustom);
      setIsOrderShown(isTeamOrderShown.isShown);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllTeams();
    getTeamsConfig();
  }, []);
  if (isLoading) return <Full_Screen_Skeleton_Loader />;
  return teams.length > 0 ? (
    <>
      <div className="flex gap-3 overflow-x-scroll">
        {teams.map((team) => (
          <div className="flex flex-col" key={team.teamId}>
            <Team_Card team={team} isOrderCustom={isOrderCustom} getAllTeams={getAllTeams} />
            <Team_QR teamId={team.teamId} teamName={team.name} />
          </div>
        ))}
      </div>
      <div className="my-4">
        <p className="text-3xl">أدوات تحكم الليدر</p>
        <div className="tools grid grid-cols-2 gap-3">
          <div className="my-3">
            <Switch
              isSelected={isPointsShownState}
              onValueChange={() => handePointShown(isPointsShownState)}
            >
              <p>عرض نقاط الفرق</p>
            </Switch>
          </div>
          <div className="my-3">
            <Switch
              isSelected={isOrderShown}
              onValueChange={() => handleOrderShown(isOrderShown)}
            >
              <p>عرض ترتيب الفرق</p>
            </Switch>
          </div>
          <div className="my-3">
            <Switch
              isSelected={isOrderCustom}
              onValueChange={() => handleOrderIsCustom(isOrderCustom)}
            >
              <p>ترتيب المراكز يدويا</p>
            </Switch>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p className="text-2xl text-center">لا يوجد فرق حاليا</p>
  );
};

export default Teams;
