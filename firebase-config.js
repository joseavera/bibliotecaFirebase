import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

 const firebaseConfig = {
    apiKey: "AIzaSyBTU",
    authDomain: "bdnosql-de619.firebaseapp.com",
    projectId: "b19",
    storageBucket: "bdnoapp",
    messagingSenderId: "519",
    appId: "1:5193611",
    measurementId: "G0"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
