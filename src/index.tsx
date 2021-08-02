import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import store from './store';
import theme from './lib/theme';

import App from './components/App';

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// Needed for Hot Module Replacement
// @ts-ignore
if (typeof(module.hot) !== 'undefined') {
  // @ts-ignore
  module.hot.accept(); // eslint-disable-line no-undef  
}
