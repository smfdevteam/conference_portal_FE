import { getToken } from "firebase/messaging";
import { CONFERENCE_FIREBASE_MESSAGEING_HANDLER } from "../firebase/firebase.config";
// Function to check if the user agent is for a mobile device
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};
const tokenHandler = async () => {
  console.log('start token handler')
  if (!localStorage.getItem("notification_token")) {
  console.log('start token handler inside if')

    const token = await getToken(CONFERENCE_FIREBASE_MESSAGEING_HANDLER, {
      vapidKey:
        "BHRkWHqZNQekKcfTwmVEXf2gvgUQ3Rs7N0YddvTTYHLALeLHmf3ghPZGYMkBGzd5CHqMNDnQKF18RcfFkKYTj3I",
    });
    console.log('token' , token)
    localStorage.setItem("notification_token", token);
  }
};
export const handleNotifications = async () => {
  try {
    if (Notification.permission !== "granted") {
      console.log('not grandted')
      await Notification.requestPermission();
      await tokenHandler();
    } else {
      console.log('grandted')
      await tokenHandler();
    }
  } catch (e) {
    console.log(e.message)
  }
};
