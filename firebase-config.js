import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBZEVISZuRfn1iC3be5b7xTMQiCZubXyTU",
    authDomain: "bdnosql-de619.firebaseapp.com",
    projectId: "bdnosql-de619",
    storageBucket: "bdnosql-de619.firebasestorage.app",
    messagingSenderId: "519369652548",
    appId: "1:519369652548:web:260c2b45275f5a0ff5ff11",
    measurementId: "G-1FYEJLG220"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
