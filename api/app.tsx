// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1MICF9DbaIqfCxJqWPRIKM4ED_OoZUfs",
  authDomain: "trello-a8371.firebaseapp.com",
  projectId: "trello-a8371",
  storageBucket: "trello-a8371.appspot.com",
  messagingSenderId: "888917075066",
  appId: "1:888917075066:web:fc6da193e8c1a60e9cc7c3",
  databaseURL:
    "https://trello-a8371-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
