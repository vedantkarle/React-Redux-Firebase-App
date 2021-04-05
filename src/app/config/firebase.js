import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAAR7ZE0kT2ywjIwt7srlCSKSSUSbXyGiY",
  authDomain: "re-vents-309706.firebaseapp.com",
  projectId: "re-vents-309706",
  storageBucket: "re-vents-309706.appspot.com",
  messagingSenderId: "380814776225",
  appId: "1:380814776225:web:97dbdb196d5a10e28e9de0",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
