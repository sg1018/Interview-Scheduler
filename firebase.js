import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKcMo0hds3bGKWyrZQDjLO4gmEXGFM5JQ",
  authDomain: "ideas-app-development.firebaseapp.com",
  projectId: "ideas-app-development",
  storageBucket: "ideas-app-development.appspot.com",
  messagingSenderId: "463447074053",
  appId: "1:463447074053:web:6f414f268abbbfb13c836c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);  

export const storage = firebase.storage();