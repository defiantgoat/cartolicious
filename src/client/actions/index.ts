import {
  SET_BACKGROUND,
  SET_BUSY,
  SET_CARTOLICIOUS_STYLES,
  SET_LOGGED_OUT,
  SET_USER_DATA,
  SET_TOKEN,
  SET_USER_ID,
  SET_USER_CONTENT,
} from "../constants";
import { ReduxActionProps } from "../interfaces";

export const setBackground = (payload: any): ReduxActionProps => {
  return { type: SET_BACKGROUND, payload };
};

export const setCaroliciousStyles = (payload: any): ReduxActionProps => {
  return { type: SET_CARTOLICIOUS_STYLES, payload };
};

export const setBusy = (payload: any): ReduxActionProps => {
  return { type: SET_BUSY, payload };
};

export const setUser = (payload: any): ReduxActionProps => {
  return { type: SET_USER_DATA, payload };
};

export const setToken = (payload: string): ReduxActionProps => {
  return { type: SET_TOKEN, payload };
};

export const logOut = (): ReduxActionProps => {
  return { type: SET_LOGGED_OUT, payload: null };
};

export const setUserId = (payload: any): ReduxActionProps => {
  return { type: SET_USER_ID, payload };
};

export const setUserContent = (payload: {
  styles: any[];
  curations: any[];
}): ReduxActionProps => {
  return { type: SET_USER_CONTENT, payload };
};
