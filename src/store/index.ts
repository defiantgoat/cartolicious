import { createStore } from 'redux';
import rootReducer from '../reducers/index';

//const store = createStore(rootReducer);

const store = createStore(
  rootReducer,
  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ &&  /* istanbul ignore next */ window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
