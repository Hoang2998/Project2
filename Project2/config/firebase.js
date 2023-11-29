// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3Fwv0_paC4lCzw2Fw0yD15xHb-iUMvqY",
  authDomain: "hoang2998-eaf91.firebaseapp.com",
  projectId: "hoang2998-eaf91",
  storageBucket: "hoang2998-eaf91.appspot.com",
  messagingSenderId: "32234530317",
  appId: "1:32234530317:web:8a10857c4a80430c3b1744",
  measurementId: "G-KF5M3EQD68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)

const analytics = getAnalytics(app);