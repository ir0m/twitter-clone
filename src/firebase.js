
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAunBXed3tUraz5PQXpN1CWKpA7gTtU7YM",
  authDomain: "twitter-clone-6d5db.firebaseapp.com",
  projectId: "twitter-clone-6d5db",
  storageBucket: "twitter-clone-6d5db.appspot.com",
  messagingSenderId: "688634272264",
  appId: "1:688634272264:web:8ccb69be6e18efafa04fbd"
};


const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth = getAuth(app);
//export default {db,auth};
export {db,auth};