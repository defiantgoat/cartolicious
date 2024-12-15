import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import store from "./store";
import theme from "./lib/theme";

import App from "./components/App";
// import { Auth0Provider } from "@auth0/auth0-react";

const el = document.getElementById("root");
if (el === null) throw new Error("Root container missing in index.html");

const root = ReactDOM.createRoot(el);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
);

// root.render(
//   <Auth0Provider
//     domain="dev-785wn7ma.us.auth0.com"
//     clientId="s6F3LbFaqZrZMYD3vb1JFirj8792vyYC"
//     authorizationParams={{ redirect_uri: window.location.origin }}
//   >
//     {/* <Provider store={store}> */}
//     {/* <ThemeProvider theme={theme}> */}
//     <div>jayson</div>
//     {/* <App /> */}
//     {/* </ThemeProvider> */}
//     {/* </Provider> */}
//   </Auth0Provider>,
// );

// Needed for Hot Module Replacement
// @ts-ignore
if (typeof module.hot !== "undefined") {
  // @ts-ignore
  module.hot.accept(); // eslint-disable-line no-undef
}
