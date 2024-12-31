import html2canvas from "html2canvas";

export const objectFromMap = (map: Map<any, any>): Record<string, any> => {
  const outObj = {};

  map.forEach((value, key) => (outObj[key] = value));

  return outObj;
};

export const mapFromObject = (obj: Record<string, any>): Map<any, any> => {
  const outMap = new Map();

  for (const key in obj) {
    outMap.set(key, obj[key]);
  }

  return outMap;
};

export const getThumbnail = async ({ map, exportOptions }) => {
  const canvas = await html2canvas(map.getViewport(), exportOptions);
  const data = canvas.toDataURL(undefined, 1);
  return data;
};
