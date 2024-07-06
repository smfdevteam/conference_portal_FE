// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

const firebaseConfig = {
  apiKey: '%%VITE_FIREBASE_API_KEY%%',
  authDomain: '%%VITE_FIREBASE_AUTH_DOMAIN%%',
  projectId: '%%VITE_FIREBASE_PROJECT_ID%%',
  storageBucket: '%%VITE_FIREBASE_STORAGE_BUCKET%%',
  messagingSenderId: '%%VITE_FIREBASE_MESSAGING_SENDER_ID%%',
  appId: '%%VITE_FIREBASE_APP_ID%%',
  measurementId: '%%VITE_FIREBASE_MEASUREMENT_ID%%',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});