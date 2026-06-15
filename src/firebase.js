import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRN02evVuJP4wX3khmI63yRMXAYpF-nRM",
  authDomain: "atc-website-ddd37.firebaseapp.com",
  projectId: "atc-website-ddd37",
  storageBucket: "atc-website-ddd37.firebasestorage.app",
  messagingSenderId: "449650054343",
  appId: "1:449650054343:web:4bd9f6476e04f271b71ae2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
