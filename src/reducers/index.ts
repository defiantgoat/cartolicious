import { SET_BACKGROUND, SET_CARTOLICIOUS_STYLES } from "../constants";
import { ReduxActionProps, ReduxStateConfigProps } from "../interfaces";
import { randomRGBAGenerator } from "../cartolicious/utils";
import { generateRandomCartoliciousStyles } from "../cartolicious/styles";

export const initialState: ReduxStateConfigProps = {
  background: randomRGBAGenerator(),
  cartolicious_styles: generateRandomCartoliciousStyles(),
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
    default:
      return state;
  }
};

export default rootReducer;
