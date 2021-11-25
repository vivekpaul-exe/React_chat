
import dotenv from "dotenv";
import  firebase from  "firebase/app";
//import 'firebase/firestore';
//import  'firebase/app';
import  "firebase/database";
import  "firebase/firestore"
dotenv.config();

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: "AIzaSyCUD8airOAq3f1S_Q_KxxowZLxOXWw5tAQ",
  authDomain: "newagent-d7fbd.firebaseapp.com",
  databaseURL: "https://newagent-d7fbd.firebaseio.com",
  projectId: "newagent-d7fbd",
  storageBucket: "newagent-d7fbd.appspot.com",
  messagingSenderId: "780361236560",
  appId: "1:780361236560:web:3c768f501b17bad2421155"
}
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig)
}


export const database = firebase.firestore()

export default firebase;
