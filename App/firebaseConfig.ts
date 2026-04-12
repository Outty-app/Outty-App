// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6L7qHMGeh0Bw9GqWRSZfqAqhUioulQUQ",
  authDomain: "outty-dev-3a0b1.firebaseapp.com",
  projectId: "outty-dev-3a0b1",
  storageBucket: "outty-dev-3a0b1.firebasestorage.app",
  messagingSenderId: "349245259412",
  appId: "1:349245259412:web:ca08daf63c28a13beafe81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);