import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "@licious/web-components/dist/licious-js/licious-js.css";

import App from "./components/App";
import FirebaseProvider from "./components/Firebase/provider";

render(
  <FirebaseProvider>
    <Provider store={store}>
      <App />
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
