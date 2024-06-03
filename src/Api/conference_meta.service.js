import { api } from "./api";
const skipInterceptor_header = { skipInterceptors: true };

const getConferenceSpeakers = async () => {
  try {
    const speakersRes = await api.get("/conference/speaker", {
      headers: skipInterceptor_header,
    });
    console.log(speakersRes.data);
  } catch (error) {
    console.log(error);
  }
};

const getAlertsandHappenNow = async () => {
  try {
    const alertsAndHappenNow = await api.get("conference/alert_happen", {
      headers: skipInterceptor_header,
    });
    return alertsAndHappenNow.data;
  } catch (error) {
    console.log(error);
  }
};
const getLookups = async () => {
  try {
    const lookups = await api.get("conference/lookups", {
      headers: skipInterceptor_header,
    });
    return lookups.data;
  } catch (error) {
    console.log(error);
  }
};

const getConferenceMaterial = async () => {
  try {
    const material = await api.get("/guest/materials");
    return material.data
  } catch (e) {
    throw new Error(e.message);
  }
};

export {
  getConferenceSpeakers,
  getAlertsandHappenNow,
  getLookups,
  getConferenceMaterial,
};
