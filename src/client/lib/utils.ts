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
