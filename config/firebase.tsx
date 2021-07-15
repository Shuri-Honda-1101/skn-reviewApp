import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRagsjhBuj3cVPlHkT2FaYsGPX20XGJbk",
  authDomain: "skn-reviewapp.firebaseapp.com",
  projectId: "skn-reviewapp",
  storageBucket: "skn-reviewapp.appspot.com",
  messagingSenderId: "988445507116",
  appId: "1:988445507116:web:bd3f586e19195637ba5b89",
  measurementId: "G-GX1V53SPEX",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { firebase, auth, db, storage };
