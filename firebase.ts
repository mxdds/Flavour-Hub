// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB6awXpRGs3_I-Vi4snJRMq3oSP7SCfMyU",
  authDomain: "flavour-hub-5427a.firebaseapp.com",
  projectId: "flavour-hub-5427a",
  storageBucket: "flavour-hub-5427a.firebasestorage.app",
  messagingSenderId: "1053366761442",
  appId: "1:1053366761442:web:6bfa039d0c7e3608b4abbb",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported (not in SSR or unsupported environments)
let analytics: any = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export const auth = getAuth(app);
export { analytics };

export const db = getFirestore(app);
export const storage = getStorage(app);