import axios from "axios";

import { handleRefreshToken } from "./auth.service";
const api = axios.create({
  baseURL: 'https://conference-portal-be.vercel.app',
  timeout: 20000,
});

const reqCallback = (request) => {
  let accessToken = localStorage.getItem("X-ACCESS-TOKEN");
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
};

const reqError = (error) => Promise.reject(error);

const resError = async (error) => {
  const {
    config,
    response: { status },
  } = error;
  const _original_req = config;
  if (status == 401) {
    await handleRefreshToken();
    return api(_original_req);

  }

  return Promise.reject(error);
};


api.interceptors.request.use(reqCallback, reqError);
api.interceptors.response.use((response) => response, resError);

export { api };

