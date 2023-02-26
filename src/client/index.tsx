import React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "react-redux";
import store from "./store";
import theme from "./lib/theme";

import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";

render(
  <Auth0Provider
    domain="dev-785wn7ma.us.auth0.com"
    clientId="s6F3LbFaqZrZMYD3vb1JFirj8792vyYC"
    // audience="https://api.cartolicious.com/"
    // scope="read:current_user get:styles"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);

// Needed for Hot Module Replacement
// @ts-ignore
if (typeof module.hot !== "undefined") {
  // @ts-ignore
  module.hot.accept(); // eslint-disable-line no-undef
}
