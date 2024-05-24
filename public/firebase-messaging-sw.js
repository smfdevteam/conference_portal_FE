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
    apiKey: "AIzaSyAGE6y9zowVBy2b0ZxrNX8NrF9MUOauIKI",
    authDomain: "smfconferencebe.firebaseapp.com",
    projectId: "smfconferencebe",
    storageBucket: "smfconferencebe.appspot.com",
    messagingSenderId: "561521603159",
    appId: "1:561521603159:web:3c6672ae490ca95e39e912",
    measurementId: "G-GNE902NGGV",
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