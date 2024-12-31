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
  OPEN_CURATIONS_DIALOG,
  CLOSE_CURATIONS_DIALOG,
  ADD_STYLE,
  ADD_CURATION,
} from "../constants";
import { ReduxActionProps, ReduxStateConfigProps } from "../interfaces";

export const DEFAULT_USER = {
  user_id: null,
  logged_in: false,
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
      console.log("TOGGLE_CURATIONS_DIALOG");
      const { curations_dialog_open } = state;
      return {
        ...state,
        curations_dialog_open: !curations_dialog_open,
      };
    case CLOSE_CURATIONS_DIALOG:
      return {
        ...state,
        curations_dialog_open: false,
      };
    case OPEN_CURATIONS_DIALOG:
      return {
        ...state,
        curations_dialog_open: true,
      };
    case SET_CARTOLICIOUS_STYLES:
      const {
        styleMap,
        style_id = null,
        curation_id = null,
        resetStyleId = false,
        resetCurationId = false,
      } = payload;
      const newState = {
        ...state,
        cartolicious_styles: styleMap,
      };
      if (style_id) {
        newState["style_id"] = style_id;
      }
      if (resetStyleId) {
        newState["style_id"] = null;
      }
      if (curation_id) {
        newState["curation_id"] = curation_id;
      }
      if (resetCurationId) {
        newState["curation_id"] = null;
      }
      return newState;
    case SET_BUSY:
      return {
        ...state,
        busy: payload,
      };
    case SET_USER_DATA:
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
          logged_in: false,
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
    case ADD_STYLE: {
      return {
        ...state,
        user: {
          ...state.user,
          styles: [...state.user.styles, payload],
        },
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
