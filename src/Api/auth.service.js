import { CONFERENCE_FIREBASE_CLIENT_AUTH_HANDLER } from "../firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { isTokenExist, setTokens } from "./utils";
import axios from "axios";
import toast from "react-hot-toast";

const resetClientPassword = async (email) => {
  try {
    await sendPasswordResetEmail(
      CONFERENCE_FIREBASE_CLIENT_AUTH_HANDLER,
      email
    );
  } catch (e) {
    console.log(e);
  }
};

const register = async (userData) => {
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

const login = async (credentials) => {
  try {
    const headers = { skipInterceptors: true };
    const response = await api.post("/guest/auth/login", credentials, {
      headers,
    });
    toast.success("بنرحب بيك");
    return response;
  } catch (error) {
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

const handleRefreshToken = async () => {
  try {
    const refresh = localStorage.getItem("X-REFRESH-TOKEN");
    const {
      data: { id_token, refresh_token, user },
    } = await axios.post(
      "https://conference-portal-be.vercel.app/guest/auth/refresh-token",
      null,
      {
        headers: {
          refresh,
        },
      }
    );
    setTokens(id_token, refresh_token);
    return { id_token, refresh_token, user };
  } catch (e) {
    throw new Error(e.message);
  }
};

const verifyToken = async () => {
  try {
    const loggedInToken = localStorage.getItem("X-ACCESS-TOKEN");

    const { data } = await axios.post(
      "https://conference-portal-be.vercel.app/guest/auth/verify_token",
      null,
      {
        headers: {
          token: loggedInToken,
        },
      }
    );
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const silentLogin = async (setLoading, setUserState, toLogin) => {
  if (isTokenExist()) {
    try {
      setLoading(true);
      const user = await verifyToken();
      console.log(user);
      setUserState((prev) => ({
        ...prev,
        user,
        isLogged: true,
      }));
    } catch (e) {
      const { user } = await handleRefreshToken();
      setUserState((prev) => {
        return { ...prev, user, isLogged: true };
      });
    } finally {
      setLoading(false);
    }
  } else {
    toLogin('/login');
  }
};

export {
  resetClientPassword,
  register,
  login,
  verifyToken,
  handleRefreshToken,
  silentLogin
};
