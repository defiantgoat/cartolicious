import { SET_BACKGROUND, SET_CARTOLICIOUS_STYLES } from "../constants";
import {
  ReduxActionProps,
  CartoliciousStyles,
  CartoliciousStyle,
} from "../interfaces";

export const setBackground = (payload: any): ReduxActionProps => {
  return { type: SET_BACKGROUND, payload };
};

export const setCaroliciousStyles = (payload: any): ReduxActionProps => {
  return { type: SET_CARTOLICIOUS_STYLES, payload };
};
