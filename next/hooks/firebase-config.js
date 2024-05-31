import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// 這裡貼上從firebase專案設定中，網頁應用程式整合的設定值
const firebaseConfig = {
  apiKey: "AIzaSyAdBvEOUTLxoiQ4420Mv0WrhkbqH1fu4t0",
  authDomain: "react-auth-b7514.firebaseapp.com",
  projectId: "react-auth-b7514",
  storageBucket: "react-auth-b7514.appspot.com",
  messagingSenderId: "1063542473751",
  appId: "1:1063542473751:web:90934245200942193f8852"
};

export { firebaseConfig }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const provide = new GoogleAuthProvider();
