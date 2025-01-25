import { createSlice } from "@reduxjs/toolkit";
import { Curation } from "../interfaces";

interface User {
  anonymous: boolean;
  user_id: string | null;
  uid?: string;
  logged_in: boolean;
  token: string;
  details: any;
  styles: any[];
  curations: Curation[];
  roles: string[];
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user_id: null,
    logged_in: false,
    details: null,
    token: "",
    styles: [],
    curations: [],
    roles: ["basic"],
    anonymous: false,
    uid: "",
  } as User,
  reducers: {
    set_user_data: (state, action) => {
      const { payload } = action;
      state.details = payload.details;
      state.logged_in = payload.logged_in;
      state.token = payload.token;
      state.uid = payload.uid;
    },
    set_user_id: (state, action) => {
      const { _id, roles } = action?.payload || {};
      state.user_id = _id || "";
      state.roles = roles || ["basic"];
      state.anonymous = false;
    },
    set_anonymous: (state) => {
      state.anonymous = true;
    },
    set_user_content: (state, action) => {
      const { styles = [], curations = [] } = action?.payload || {};
      state.styles = styles;
      state.curations = curations;
    },
    set_logged_out: (state) => {
      state.user_id = null;
      state.logged_in = false;
      state.token = "";
      state.details = null;
      state.styles = [];
      state.curations = [];
      state.uid = "";
      state.roles = ["basic"];
      state.anonymous = false;
    },
    set_token: (state, action) => {
      state.token = action?.payload || "";
    },
    add_style: (state, action) => {
      const { payload } = action;
      state.styles = [...state.styles, payload];
    },
    remove_curation: (state, action) => {
      const { payload } = action;
      state.curations = state.curations.filter((c) => c._id !== payload);
    },
    add_curation: (state, action) => {
      const { payload } = action;
      state.curations = [...state.curations, payload];
    },
  },
});

export const {
  set_user_data,
  set_anonymous,
  set_logged_out,
  set_token,
  set_user_content,
  set_user_id,
  add_style,
  remove_curation,
  add_curation,
} = userSlice.actions;

export default userSlice.reducer;
