import { api } from "./api";
const getTeams = async () => {
  try {
    const teams = await api.get("/guest/teams");
    return teams.data;
  } catch (e) {
    throw new Error(e.message);
  }
};
const getTeambyId = async (teamId) => {
  try {
    const team = await api.get(`/guest/teams/team/${teamId}`);
    return team.data;
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

const getGuestByPointId = async (pointId) => {
  try {
    const guestRes = await api.get("/guest/teams/user-pointId", {
      params: {
        id: pointId,
      },
    });
    return guestRes.data;
  } catch (e) {
    const {
      response: { data },
    } = e;
    throw new Error(data);
  }
};

const controlGuestPoints = async (points, guestId) => {
  try {
    await api.put("/guest/teams/guest-point", {
      guestId,
      points,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

const joinGuestToTeam = async (teamId, userId) => {
  try {
    await api.post(`/guest/teams/${teamId}/${userId}`);
  } catch (e) {
    throw new Error(e.message);
  }
};

export {
  getTeams,
  controlTeamPoints,
  getGuestByPointId,
  controlGuestPoints,
  getTeambyId,
  joinGuestToTeam
};
