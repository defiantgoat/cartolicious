export const APP_NAME = "Cartolicious";
export const VERSION = "1.0.0";

export const MAP_CONFIG = {
  MIN_ZOOM: 9,
  MAX_ZOOM: 16,
  DEFAULT_ZOOM: 12,
  DEFAULT_CENTER: [-8573959.232998796, 4705918.436640128],
};

export const ENDPOINTS = {
  GET_STYLES: (token: string) =>
    `http://api.cartolicious.com/v1/styles?token=${token}`,
};
