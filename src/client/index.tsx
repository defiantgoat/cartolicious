import React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import FirebaseContext from "./components/Firebase/context";
import store from "./store";
import theme from "./lib/theme";

import App from "./components/App";
import FirebaseProvider from "./components/Firebase/provider";

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD9NE-sHg5Ju2d9rnB75MELgJsN-hzv54M",
//   authDomain: "cartolicious-d7df3.firebaseapp.com",
//   projectId: "cartolicious-d7df3",
//   storageBucket: "cartolicious-d7df3.firebasestorage.app",
//   messagingSenderId: "587013647223",
//   appId: "1:587013647223:web:908752fad5ce3865fc4f72",
//   measurementId: "G-109CYDGRTL",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

render(
  <FirebaseProvider>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </FirebaseProvider>,
  document.getElementById("root")
);

// Needed for Hot Module Replacement
// @ts-ignore
if (typeof module.hot !== "undefined") {
  // @ts-ignore
  module.hot.accept(); // eslint-disable-line no-undef
}
