import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const api = axios.create({
  baseURL: "https://conference-portal-be.vercel.app",
});

api.interceptors.request.use(
  async function (config) {
    if (config.headers.skipInterceptors) return config;

    let token = localStorage.getItem("X-ACCESS-TOKEN");

    if (token) {
      const isValid = await verifyToken(token);
      if (!isValid) {
        token = await refreshToken();
        if (!token) {
          clearTokens();
          useNavigate("/login");
        }
      }
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await refreshToken();
      if (token) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return api(originalRequest);
      } else {
        clearTokens();
        useNavigate("/login");
      }
    }
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
    console.log("error api ===", error);
    if (!error?.response) {
      toast.error("No Server Response");
    } else if (
      error?.response.data.message === "TOO_SHORT" ||
      error?.response.data.message === "TOO_LONG"
    ) {
      toast.error("الموبايل مش مظبوط");
    } else if (error?.response.data.message === "user already exist") {
      toast.error("البريد الإلكتروني مسجل بالفعل من قبل");
    } else if (
      error?.response.data.message ===
      "The user with the provided phone number already exists."
    ) {
      toast.error("رقم الهاتف مسجل بالفعل من قبل");
    } else if (
      error?.response.data.message ===
      "The email address is improperly formatted."
    ) {
      toast.error("الايميل مش مظبوط");
    }
  }
};

export const login = async (credentials) => {
  try {
    const headers = { skipInterceptors: true };
    const response = await api.post("/guest/auth/login", credentials, {
      headers,
    });
    toast.success("Welcome");
    return response;
  } catch (error) {
    console.log("error api ===", error);
    if (!error?.response) {
      toast.error("الرجاء معاودة المحاولة في وقت لاحق");
    } else if (
      error?.response.data.message ===
      "Firebase: Error (auth/invalid-credential)."
    ) {
      toast.error("خطأ في اسم المستخدم أو كلمة السر");
    }
  }
};

const getRefreshToken = () => localStorage.getItem("X-REFRESH-TOKEN");
const clearTokens = () => {
  localStorage.removeItem("X-ACCESS-TOKEN");
  localStorage.removeItem("X-REFRESH-TOKEN");
};
const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("X-ACCESS-TOKEN", accessToken);
  localStorage.setItem("X-REFRESH-TOKEN", refreshToken);
};

const verifyToken = async (token) => {
  try {
    await api.post("/guest/auth/verify_token", { token });
    return true;
  } catch (error) {
    return false;
  }
};

const refreshToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await api.post("/guest/auth/refresh-token", {
      token: refreshToken,
    });
    const { id_token, refresh_token } = response.data;
    setTokens(id_token, refresh_token);
    return id_token;
  } catch (error) {
    clearTokens();
    return null;
  }
};

export { refreshToken };
