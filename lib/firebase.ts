// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage, FirebaseStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwiE6tMX3E4jBxtuG6WHfIiTpKQzsYEjo",
  authDomain: "portfolio-90183.firebaseapp.com",
  projectId: "portfolio-90183",
  storageBucket: "portfolio-90183.appspot.com",
  messagingSenderId: "420711109730",
  appId: "1:420711109730:web:6e8c1298ad3b5a9d3b6d3b",
  measurementId: "G-VVWJ0L5JES",
};

let app;
let analytics;
let storage: FirebaseStorage;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);

  analytics = getAnalytics(app);
  storage = getStorage(app);
}

export { app, analytics, storage };



