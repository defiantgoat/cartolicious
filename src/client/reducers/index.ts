import {
  SET_BACKGROUND,
  SET_CARTOLICIOUS_STYLES,
  SET_BUSY,
  SET_LOGGED_OUT,
  SET_USER_DATA,
  SET_TOKEN
} from "../constants";
import { ReduxActionProps, ReduxStateConfigProps } from "../interfaces";

export const initialState: ReduxStateConfigProps = {
  background: [0, 0, 0, 1],
  cartolicious_styles: null,
  busy: false,
  user: {
    loggedIn: false,
    details: null,
    token: ""
  }
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
      return {
        ...state,
        user: payload
      };
    case SET_LOGGED_OUT: 
      return {
        ...state,
        user: {
          loggedIn: false,
          token: '',
          details: null
        }
      };
    case SET_TOKEN: {
      return {
        ...state,
        user: {
          ...state.user,
          token: payload
        }
      }
    }
    default:
      return state;
  }
};

export default rootReducer;
