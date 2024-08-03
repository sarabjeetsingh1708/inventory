import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIZIiMX1EvW5Qm9qYGQGpD3SQhAAarghQ",
  authDomain: "inventory-e8ff8.firebaseapp.com",
  projectId: "inventory-e8ff8",
  storageBucket: "inventory-e8ff8.appspot.com",
  messagingSenderId: "472947276736",
  appId: "1:472947276736:web:71109462f84a0391af6625",
  measurementId: "G-J8YQ024CEH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore };
