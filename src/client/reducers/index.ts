import {
  SET_BACKGROUND,
  SET_CARTOLICIOUS_STYLES,
  SET_BUSY,
  SET_LOGGED_OUT,
  SET_USER_DATA,
  SET_TOKEN,
  SET_USER_ID,
  SET_USER_CONTENT,
  TOGGLE_SIDEBAR,
  TOGGLE_CURATIONS_DIALOG,
  TOGGLE_STYLES_DIALOG,
} from "../constants";
import { ReduxActionProps, ReduxStateConfigProps } from "../interfaces";

export const DEFAULT_USER = {
  user_id: null,
  loggedIn: false,
  details: null,
  token: "",
  styles: [],
  curations: [],
};

export const initialState: ReduxStateConfigProps = {
  background: [0, 0, 0, 1],
  cartolicious_styles: null,
  busy: false,
  style_id: null,
  curation_id: null,
  sidebar_open: false,
  styles_dialog_open: false,
  curations_dialog_open: false,
  advanced: false,
  user: {
    ...DEFAULT_USER,
  },
};

const rootReducer = (
  state = initialState,
  action: ReduxActionProps
): ReduxStateConfigProps => {
  const { payload } = action as any;

  switch (action.type) {
    case SET_BACKGROUND:
      return {
        ...state,
        background: payload,
      };
    case TOGGLE_SIDEBAR:
      const { sidebar_open } = state;
      return {
        ...state,
        sidebar_open: !sidebar_open,
      };
    case TOGGLE_STYLES_DIALOG:
      const { styles_dialog_open } = state;
      return {
        ...state,
        styles_dialog_open: !styles_dialog_open,
      };
    case TOGGLE_CURATIONS_DIALOG:
      const { curations_dialog_open } = state;
      return {
        ...state,
        curations_dialog_open: !curations_dialog_open,
      };
    case SET_CARTOLICIOUS_STYLES:
      return {
        ...state,
        cartolicious_styles: payload,
      };
    case SET_BUSY:
      return {
        ...state,
        busy: payload,
      };
    case SET_USER_DATA:
      console.log("payload", payload);
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
        sidebar_open: true,
      };
    case SET_USER_ID:
      return {
        ...state,
        user: {
          ...state.user,
          user_id: payload,
        },
      };
    case SET_USER_CONTENT:
      const { styles, curations } = payload;
      return {
        ...state,
        user: {
          ...state.user,
          styles,
          curations,
        },
      };
    case SET_LOGGED_OUT:
      return {
        ...state,
        user: {
          user_id: null,
          loggedIn: false,
          token: "",
          details: null,
          styles: [],
          curations: [],
          uid: "",
        },
        sidebar_open: false,
      };
    case SET_TOKEN: {
      return {
        ...state,
        user: {
          ...state.user,
          token: payload,
        },
      };
    }
    case "TEMP_ACCESS":
      return {
        ...state,
        advanced: true,
      };
    default:
      return state;
  }
};

export default rootReducer;
