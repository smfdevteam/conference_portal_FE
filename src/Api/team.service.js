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

const changeTeamOrder = async (teamId, order) => {
  try {
    await api.put("/guest/teams/team-order", {
      teamId,
      order,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};
const getTheTop = async () => {
  try {
    const top = await api.get("/guest/teams/top");
    const { members, teams } = top.data;
    return { members, teams };
  } catch (e) {
    throw new Error(e.message);
  }
};
const isPointsShown = async () => {
  try {
    const isShown = await api.get("/guest/teams/show-teams-points");
    return isShown.data;
  } catch (e) {
    throw new Error(e.message);
  }
};
const teamsConfig = async () => {
  try {
    const config = await api.get("/guest/teams/teams-leaders-config");
    return config.data;
  } catch (e) {
    throw new Error(e.message);
  }
};
const setIsPointsShownApi = async (isShown) => {
  try {
    await api.put("/guest/teams/show-teams-points", {
      isShown,
    });
    return isShown.data;
  } catch (e) {
    throw new Error(e.message);
  }
};
const setIsOrderShownApi = async (isShown) => {
  try {
    await api.put("/guest/teams/show-teams-order", {
      isShown,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};
const setIsOrderCustomApi = async (isCustom) => {
  try {
    await api.put("/guest/teams/is-custom-order", {
      isCustom,
    });
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
  joinGuestToTeam,
  changeTeamOrder,
  getTheTop,
  isPointsShown,
  setIsPointsShownApi,
  teamsConfig , 
  setIsOrderShownApi , 
  setIsOrderCustomApi
};
