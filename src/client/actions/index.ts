import {
  SET_BUSY,
  SET_CURATION_ID,
  SET_STYLE_ID,
  TOGGLE_SIDEBAR,
  TOGGLE_CURATIONS_DIALOG,
  TOGGLE_STYLES_DIALOG,
} from "../constants";
import { ReduxActionProps } from "../interfaces";

export const setBusy = (payload: boolean): ReduxActionProps => {
  return { type: SET_BUSY, payload };
};

export const setStyleId = (payload: number): ReduxActionProps => {
  return { type: SET_STYLE_ID, payload };
};

export const setCurationId = (payload: number): ReduxActionProps => {
  return { type: SET_CURATION_ID, payload };
};

export const toggleSidebar = (): ReduxActionProps => {
  return { type: TOGGLE_SIDEBAR, payload: null };
};

export const toggleStylesDialog = (): ReduxActionProps => {
  return { type: TOGGLE_STYLES_DIALOG, payload: null };
};

export const toggleCurationsDialog = (): ReduxActionProps => {
  return { type: TOGGLE_CURATIONS_DIALOG, payload: null };
};
