import axios from "axios";

export const api = axios.create({
  baseURL: "https://conference-portal-be.onrender.com",
});

api.interceptors.request.use(
  function (config) {
    console.log("config = ", config);
    if (config.headers.skipInterceptors) return config;

    const token = localStorage.getItem("X-ACCESS-TOKEN");

    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
      return config;
    } else {
      throw new Error("unAuthorizaedUser");
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const register = async (userData) => {
  try {
    const headers = { skipInterceptors: true };
    const response = await api.post("/guest/auth/register", userData, {
      headers,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    if (!error?.response) {
      return "No Server Response";
    }
  }
};

export const login = async (credentials) => {
  try {
    const headers = { skipInterceptors: true };
    const response = await api.post("/guest/auth/login", credentials, {
      headers,
    });
    console.log("response.data", response);

    return response;
  } catch (error) {
    console.log(error)
    if (!error?.response) {
      return "No Server Response";
    }
    return error.response.data.message
  }
};
