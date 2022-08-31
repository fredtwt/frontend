import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase's configuration
const firebaseConfig = {
	apiKey: "AIzaSyDeJkEKRIYJg1p2iP9-ybSlPl8Ye-7ZqjU",
	authDomain: "peerprep-eacee.firebaseapp.com",
	projectId: "peerprep-eacee",
	storageBucket: "peerprep-eacee.appspot.com",
	messagingSenderId: "718619004320",
	appId: "1:718619004320:web:9af47d29678bb9be1968c5",
	measurementId: "G-E06SE4F6FP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);