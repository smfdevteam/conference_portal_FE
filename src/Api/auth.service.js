import { CONFERENCE_FIREBASE_CLIENT_AUTH_HANDLER } from "../firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { isTokenExist, setTokens } from "./utils";
import axios from "axios";
import toast from "react-hot-toast";
import { api } from "./api";

const resetClientPassword = async (email) => {
  try {
    await sendPasswordResetEmail(
      CONFERENCE_FIREBASE_CLIENT_AUTH_HANDLER,
      email
    );

    toast.success("تم إرسال البريد الإلكتروني");
  } catch (error) {
    const errorCode = error.code;
    console.log(errorCode);
    if (!error?.code) {
      toast.error("الرجاء معاودة المحاولة في وقت لاحق");
    } else if (errorCode == "auth/invalid-email") {
      toast.error("البريد الإلكتروني غير مسجل");
    }
  }
};

const register = async (userData) => {
  try {
    const headers = { skipInterceptors: true };
    const response = await axios.post(
      "https://conference-portal-be.vercel.app/guest/auth/register",
      userData,
      {
        headers,
      }
    );

    toast.success("اكتمل التسجيل");
    return response.data;
  } catch (error) {
    console.log("error api ===", error);
    if (!error?.response) {
      toast.error("الرجاء معاودة المحاولة في وقت لاحق");
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
    toast.success("أهلا بيك معانا");
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

const editProfile = async (userData) => {
  try {
    const response = await api.put("/guest/profile", userData);

    toast.success("تم تحديث بيانات  بنجاح!");
    return response.data;
  } catch (error) {
    if (!error?.response) {
      toast.error("الرجاء معاودة المحاولة في وقت لاحق");
    }
  }
};

const editProfileImage = async (ProfileImage) => {
  try {
    const response = await api.put("/guest/profile/image", ProfileImage);

    toast.success("تم تغيير الصورة بنجاح!");
    return response.data;
  } catch (error) {
    if (!error?.response) {
      toast.error("يرجى المحاولة مرة أخرى لتحميل الصورة");
    }
  }
};

const getPublicProfile = async (requesteduid) => {
  try {
    const headers = { requesteduid };
    const response = await api.get("/guest/profile/public", { headers });
    return response.data;
  } catch (error) {
    if (!error?.response) {
      toast.error("الرجاء معاودة المحاولة في وقت لاحق");
    } else {
      return "blocked";
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
    toLogin("/login");
  }
};

const addVapdid = async (token) => {
  try {
    toast.loading("Handle Notifications");
    const { data } = await axios.post(
      "https://conference-portal-be.vercel.app/guest/auth/vapid",
      { token }
    );
    toast.dismiss();
    toast.success('Handled')
    return data;
  } catch (e) {
    throw new Error(e.message);
  } finally {
    toast.dismiss();
  }
};
export {
  resetClientPassword,
  register,
  login,
  verifyToken,
  handleRefreshToken,
  silentLogin,
  editProfile,
  editProfileImage,
  getPublicProfile,
  addVapdid,
};
