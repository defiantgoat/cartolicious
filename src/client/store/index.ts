import rootReducer from "../reducers/rootSlice";
import userReducer from "../reducers/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { root: rootReducer, user: userReducer },
});

export default store;
