
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router';
const firebaseConfig = {
  apiKey: "AIzaSyA92AdCJD5EvM-2eEen2ohD8vziYW1U6MY",
  authDomain: "quiz-a1660.firebaseapp.com",
  projectId: "quiz-a1660",
  storageBucket: "quiz-a1660.appspot.com",
  messagingSenderId: "872450901403",
  appId: "1:872450901403:web:6042e2a56b58acb726cd3e",
  measurementId: "G-1DC7MVMTNG",
  
};
const firebase = () => {
}
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth=getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {

  signInWithPopup(auth,provider).then(result=>{
    // const name = result.user.displayName;
    // console.log("n ",name);
  }).catch(error => {
    console.log("error ",error);
  })
}
export default db;