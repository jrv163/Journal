// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXm9wtZAOBT23dJFBADppu6IezA3goLj0",
  authDomain: "react-24ff8.firebaseapp.com",
  projectId: "react-24ff8",
  storageBucket: "react-24ff8.appspot.com",
  messagingSenderId: "372910087298",
  appId: "1:372910087298:web:6abed67f1f4a570261e89b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );