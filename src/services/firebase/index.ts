import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "spender-e2809.firebaseapp.com",
  projectId: "spender-e2809",
  storageBucket: "spender-e2809.firebasestorage.app",
  messagingSenderId: "923598294844",
  appId: "1:923598294844:web:ae410beb311eb039579839",
  measurementId: "G-74T6VPQQ0K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db
}