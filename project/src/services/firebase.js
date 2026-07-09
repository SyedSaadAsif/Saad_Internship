// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG_Q_cp78SXtFeOF1vSWRNRBV7esV1U3Y",
  authDomain: "devv-687a2.firebaseapp.com",
  projectId: "devv-687a2",
  storageBucket: "devv-687a2.firebasestorage.app",
  messagingSenderId: "733818938982",
  appId: "1:733818938982:web:c4e600dc347989638eafa7",
  measurementId: "G-JQJ27XJBLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };