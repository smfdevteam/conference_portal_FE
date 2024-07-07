// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGE6y9zowVBy2b0ZxrNX8NrF9MUOauIKI",
  authDomain: "smfconferencebe.firebaseapp.com",
  projectId: "smfconferencebe",
  storageBucket: "smfconferencebe.appspot.com",
  messagingSenderId: "561521603159",
  appId: "1:561521603159:web:3c6672ae490ca95e39e912",
  measurementId: "G-GNE902NGGV",
};

// Initialize Firebase
const CONFERENCE_FIREBASE_CLIENT_APP = initializeApp(firebaseConfig);
const CONFERENCE_FIREBASE_CLIENT_AUTH_HANDLER = getAuth(
  CONFERENCE_FIREBASE_CLIENT_APP
);
const CONFERENCE_FIREBASE_MESSAGEING_HANDLER = getMessaging(
  CONFERENCE_FIREBASE_CLIENT_APP
);
const CONFERENCE_FIREBASE_ANALYTICS_HANDLER = getAnalytics(
  CONFERENCE_FIREBASE_CLIENT_APP
);
export {
  CONFERENCE_FIREBASE_CLIENT_AUTH_HANDLER,
  CONFERENCE_FIREBASE_MESSAGEING_HANDLER,
};