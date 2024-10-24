import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbSjgIdH3QfzxTs1DASV0spWgoiMggODI",
  authDomain: "skillswap-69b23.firebaseapp.com",
  projectId: "skillswap-69b23",
  storageBucket: "skillswap-69b23.appspot.com",
  messagingSenderId: "567522365718",
  appId: "1:567522365718:web:26b9d23e0c4994c35a8037",
  measurementId: "G-8THB4H5MC0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);