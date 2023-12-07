// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmP4P50DDK_y6Ww7EMNPZLDp8wP5APNQI",
  authDomain: "otp-project-26dd8.firebaseapp.com",
  projectId: "otp-project-26dd8",
  storageBucket: "otp-project-26dd8.appspot.com",
  messagingSenderId: "988121843264",
  appId: "1:988121843264:web:9f75485cc697f01c0e01a5",
  measurementId: "G-XFBP33N13C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);