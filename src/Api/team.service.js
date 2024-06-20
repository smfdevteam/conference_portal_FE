import { api } from "./api";
const getTeams = async () => {
  try {
    const teams = await api.get("/guest/teams");
    return teams.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const controlTeamPoints = async (teamId, points) => {
  try {
    let pointsNumber = parseInt(points, 10);
    await api.put("/guest/teams/team-point", { teamId, points: pointsNumber });
  } catch (e) {
    throw new Error(e.message);
  }
};

export { getTeams , controlTeamPoints };
