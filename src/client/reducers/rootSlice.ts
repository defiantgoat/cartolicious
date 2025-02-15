import { createSlice } from "@reduxjs/toolkit";

export const rootSlice = createSlice({
  name: "root",
  initialState: {
    background: [0, 0, 0, 1],
    cartolicious_styles: null,
    curation_info: null,
    busy: false,
    style_id: null,
    curation_id: null,
    sidebar_open: false,
    styles_dialog_open: false,
    curations_dialog_open: false,
    map_selections: [],
  },
  reducers: {
    set_map_selections: (state, action) => {
      state.map_selections = action.payload;
    },
    set_background: (state, action) => {
      state.background = action.payload;
    },
    open_sidebar: (state) => {
      state.sidebar_open = true;
    },
    close_sidebar: (state) => {
      state.sidebar_open = false;
    },
    open_styles_dialog: (state) => {
      state.styles_dialog_open = true;
    },
    close_styles_dialog: (state) => {
      state.styles_dialog_open = false;
    },
    open_curations_dialog: (state) => {
      state.curations_dialog_open = true;
    },
    close_curations_dialog: (state) => {
      state.curations_dialog_open = false;
    },
    set_cartolicious_styles: (state, action) => {
      const { payload } = action;
      const {
        styleMap,
        style_id = null,
        curation_id = null,
        curation_info,
        resetStyleId = false,
        resetCurationId = false,
        resetCurationInfo = false,
      } = payload;
      state.cartolicious_styles = styleMap;

      if (style_id) {
        state.style_id = style_id;
      }
      if (curation_id) {
        state.curation_id = curation_id;
      }
      if (curation_info) {
        state.curation_info = curation_info;
      }
      if (resetStyleId) {
        state.style_id = null;
      }
      if (resetCurationId) {
        state.curation_id = null;
        state.curation_info = null;
      }
      if (resetCurationInfo) {
        state.curation_info = null;
      }
    },
    set_busy: (state, action) => {
      const { payload } = action;
      state.busy = payload || false;
    },
  },
});

export const {
  set_background,
  open_sidebar,
  close_sidebar,
  open_curations_dialog,
  close_curations_dialog,
  set_cartolicious_styles,
  set_busy,
  set_map_selections,
} = rootSlice.actions;

export default rootSlice.reducer;
