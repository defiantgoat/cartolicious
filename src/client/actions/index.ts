import {
  SET_BACKGROUND,
  SET_BUSY,
  SET_CARTOLICIOUS_STYLES,
  SET_LOGGED_OUT,
  SET_USER_DATA,
  SET_TOKEN,
  SET_USER_ID,
  SET_USER_CONTENT,
  SET_CURATION_ID,
  SET_STYLE_ID,
  TOGGLE_SIDEBAR,
  TOGGLE_CURATIONS_DIALOG,
  TOGGLE_STYLES_DIALOG,
} from "../constants";
import { ReduxActionProps } from "../interfaces";

export const setBackground = (payload: number[]): any => {
  return { type: SET_BACKGROUND, payload };
};

export const setCaroliciousStyles = (payload: any): any => {
  console.log(payload);
  return { type: SET_CARTOLICIOUS_STYLES, payload };
};

export const setBusy = (payload: boolean): any => {
  return { type: SET_BUSY, payload };
};

export const setUser = (payload: any): any => {
  return { type: SET_USER_DATA, payload };
};

export const setToken = (payload: string): any => {
  return { type: SET_TOKEN, payload };
};

export const logOut = (): any => {
  return { type: SET_LOGGED_OUT, payload: null };
};

export const setUserId = (payload: any): any => {
  return { type: SET_USER_ID, payload };
};

export const setUserContent = (payload: {
  styles: any[];
  curations: any[];
}): any => {
  return { type: SET_USER_CONTENT, payload };
};

export const setStyleId = (payload: number): any => {
  return { type: SET_STYLE_ID, payload };
};

export const setCurationId = (payload: number): any => {
  return { type: SET_CURATION_ID, payload };
};

export const toggleSidebar = (): any => {
  return { type: TOGGLE_SIDEBAR, payload: null };
};

export const toggleStylesDialog = (): any => {
  return { type: TOGGLE_STYLES_DIALOG, payload: null };
};

export const toggleCurationsDialog = (): any => {
  return { type: TOGGLE_CURATIONS_DIALOG, payload: null };
};
