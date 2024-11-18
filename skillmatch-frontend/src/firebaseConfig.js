// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdZnf4xzYxY44SpXc4JSqCK-XFSBSlWOA",
  authDomain: "skillmatch-48395.firebaseapp.com",
  projectId: "skillmatch-48395",
  storageBucket: "skillmatch-48395.appspot.com",
  messagingSenderId: "648822676757",
  appId: "1:648822676757:web:36426e258638edcc39dd1c",
  measurementId: "G-XFZB542RGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);