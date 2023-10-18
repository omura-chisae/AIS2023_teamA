// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAsm0PmMvyuFoZpLUd8c5MILXP0H8gHnD4",
  authDomain: "ais2023-login-app.firebaseapp.com",
  projectId: "ais2023-login-app",
  storageBucket: "ais2023-login-app.appspot.com",
  messagingSenderId: "724072697155",
  appId: "1:724072697155:web:60d9fb5905f2167a74f3f6"
});


export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
