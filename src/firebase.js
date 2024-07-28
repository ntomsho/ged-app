// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNUAt_cHERiswRyCenV4KPsUZBhxREoOU",
  authDomain: "derp2-4d238.firebaseapp.com",
  projectId: "derp2-4d238",
  storageBucket: "derp2-4d238.appspot.com",
  messagingSenderId: "588132125259",
  appId: "1:588132125259:web:ca91c950634ea35c475bce",
  databaseURL: "https://derp2-4d238-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);
