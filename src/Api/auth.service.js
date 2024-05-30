import { CONFERENCE_FIREBASE_CLIENT_AUTH_HANDLER } from "../firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";

const resetClientPassword = async (email) => {
  try {
    await sendPasswordResetEmail(
      CONFERENCE_FIREBASE_CLIENT_AUTH_HANDLER,
      email
    );
    return toast.success("تم ارسال البريد الالكتروني");
  } catch (e) {
    if (e.code == "auth/invalid-email") {
      toast.error("البريد الإلكتروني غير مسجل");
    } else if (e.code == "auth/too-many-requests") {
      toast.error("الرجاء معاودة المحاولة في وقت لاحق");
    }
  }
};

export { resetClientPassword };
