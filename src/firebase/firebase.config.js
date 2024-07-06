// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getMessaging} from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID,
  measurementId: import.meta.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const CONFERENCE_FIREBASE_CLIENT_APP = initializeApp(firebaseConfig);
const CONFERENCE_FIREBASE_CLIENT_AUTH_HANDLER = getAuth(
  CONFERENCE_FIREBASE_CLIENT_APP
);
const CONFERENCE_FIREBASE_MESSAGEING_HANDLER = getMessaging(CONFERENCE_FIREBASE_CLIENT_APP)

export { CONFERENCE_FIREBASE_CLIENT_AUTH_HANDLER  , CONFERENCE_FIREBASE_MESSAGEING_HANDLER};
