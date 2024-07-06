// replace-env.js
import path from "path";
import fs from "fs";
const env = process.env;
const filePath = path.resolve(__dirname, "public/firebase-messaging-sw.js");
let fileContent = fs.readFileSync(filePath, "utf8");

fileContent = fileContent
  .replace(/%%VITE_FIREBASE_API_KEY%%/g, env.VITE_FIREBASE_API_KEY)
  .replace(/%%VITE_FIREBASE_AUTH_DOMAIN%%/g, env.VITE_FIREBASE_AUTH_DOMAIN)
  .replace(/%%VITE_FIREBASE_PROJECT_ID%%/g, env.VITE_FIREBASE_PROJECT_ID)
  .replace(
    /%%VITE_FIREBASE_STORAGE_BUCKET%%/g,
    env.VITE_FIREBASE_STORAGE_BUCKET
  )
  .replace(
    /%%VITE_FIREBASE_MESSAGING_SENDER_ID%%/g,
    env.VITE_FIREBASE_MESSAGING_SENDER_ID
  )
  .replace(/%%VITE_FIREBASE_APP_ID%%/g, env.VITE_FIREBASE_APP_ID)
  .replace(
    /%%VITE_FIREBASE_MEASUREMENT_ID%%/g,
    env.VITE_FIREBASE_MEASUREMENT_ID
  );

fs.writeFileSync(filePath, fileContent, "utf8");
