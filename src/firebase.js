// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs0Ulnb-MY2Bs-CmVab9zLeQCL805U6Vw",
  authDomain: "podcast-app-react-a53ec.firebaseapp.com",
  projectId: "podcast-app-react-a53ec",
  storageBucket: "podcast-app-react-a53ec.appspot.com",
  messagingSenderId: "448182333445",
  appId: "1:448182333445:web:5dda8e6acb482263fa2c6c",
  measurementId: "G-BK5RH25JJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);
const auth=getAuth(app);

export {auth,db,storage}