import { api } from "./api";
const skipInterceptor_header = { skipInterceptors: true };

const getConferenceSpeakers = async () => {
  try {
    const { data } = await api.get("/conference/speaker", {
      headers: skipInterceptor_header,
    });
    return data;
  } catch (error) {
    throw new Error(error);
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
    return material.data;
  } catch (e) {
    throw new Error("حصل حاجة غلط");
  }
};

const getConferenceLocation = async () => {
  try {
    const material = await api.get("/conference/location");
    return material.data;
  } catch (e) {
    throw new Error("حصل حاجة غلط");
  }
};
const getConferenceRules = async () => {
  try {
    const rules = await api.get("/conference/rules");
    return rules.data;
  } catch (e) {
    throw new Error("حصل حاجة غلط");
  }
};
const getConferenceHost = async () => {
  try {
    const family = await api.get("/conference/family");
    return family.data;
  } catch (e) {
    throw new Error("حصل حاجة غلط");
  }
};
const getConferenceSong = async () => {
  try {
    const song = await api.get("/conference/song");
    return song.data;
  } catch (e) {
    throw new Error("حصل حاجة غلط");
  }
};

const getConferenceLeaders = async () => {
  try {
    const leaders = await api.get("/conference/leaders");
    console.log(leaders.data);
    return leaders.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getConferenceFeedBack = async () => {
  try {
    const feedbackForm = await api.get("/conference/feedback_form_url");
    return feedbackForm.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getConferenceProgram = async () => {
  try {
    const program = await api.get("/conference/program");
    return program.data;
  } catch (e) {
    throw new Error(e.message);
  }
};
export {
  getConferenceSpeakers,
  getAlertsandHappenNow,
  getLookups,
  getConferenceMaterial,
  getConferenceLocation,
  getConferenceSong,
  getConferenceRules,
  getConferenceHost,
  getConferenceLeaders,
  getConferenceFeedBack,
  getConferenceProgram
};
