import { SET_BACKGROUND } from "../constants";
import { ReduxActionProps } from "../interfaces";

export const setBackground = (payload: any): ReduxActionProps => {
  return { type: SET_BACKGROUND, payload };
};
