// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC490OmYMhGMZIzzxhFcPYkPOtDolp2iCU",
  authDomain: "ticketscorner-app.firebaseapp.com",
  projectId: "ticketscorner-app",
  storageBucket: "ticketscorner-app.appspot.com",
  messagingSenderId: "831331994429",
  appId: "1:831331994429:web:ea80af067622924517d354",
  measurementId: "G-7T3MN47B40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;