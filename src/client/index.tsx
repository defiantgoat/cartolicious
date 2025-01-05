import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./components/App";
import FirebaseProvider from "./components/Firebase/provider";
import "@licious/web-components/dist/licious-js/licious-js.css";

const domNode = document.getElementById("root") as HTMLElement;
const root = createRoot(domNode);

root.render(
  <FirebaseProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </FirebaseProvider>
);

// Needed for Hot Module Replacement
// @ts-ignore
if (typeof module.hot !== "undefined") {
  // @ts-ignore
  module.hot.accept(); // eslint-disable-line no-undef
}
