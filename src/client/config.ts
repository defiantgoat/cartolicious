export const APP_NAME = "Cartolicious";
export const VERSION = "1.1.0";

export const MAP_CONFIG = {
  MIN_ZOOM: 2,
  MAX_ZOOM: 16,
  DEFAULT_ZOOM: 0,
  DEFAULT_CENTER: [-8573959.232998796, 4705918.436640128],
};

// dev
// const API_DOMAIN = "http://localhost:3001/v1";

// prod
const API_DOMAIN = "https://cartolicious-api.onrender.com/v1";

export const ENDPOINTS = {
  STYLES: `${API_DOMAIN}/styles`,
  USER: `${API_DOMAIN}/users`,
  CURATIONS: `${API_DOMAIN}/curations`,
};
