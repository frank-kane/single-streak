// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwBJCF6qjyV1Z28vaNmntxAimZdXe_dQY",
  authDomain: "single-streak.firebaseapp.com",
  projectId: "single-streak",
  storageBucket: "single-streak.appspot.com",
  messagingSenderId: "471226813776",
  appId: "1:471226813776:web:cb76249c508c43cbdb7055",
  measurementId: "G-EXFMWLWCS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
// export const auth = getAuth(app);