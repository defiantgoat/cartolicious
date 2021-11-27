import {
  SET_BACKGROUND,
  SET_CARTOLICIOUS_STYLES,
  SET_BUSY,
} from "../constants";
import { ReduxActionProps, ReduxStateConfigProps } from "../interfaces";
import { randomRGBAGenerator } from "../cartolicious/utils";

export const initialState: ReduxStateConfigProps = {
  background: randomRGBAGenerator(),
  cartolicious_styles: null,
  busy: false,
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
    default:
      return state;
  }
};

export default rootReducer;
