import { CONFERENCE_FIREBASE_CLIENT_AUTH_HANDLER } from "../../firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
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

export { resetClientPassword };
