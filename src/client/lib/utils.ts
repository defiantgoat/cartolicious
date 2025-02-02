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
  const canvas = await html2canvas(map?.getViewport(), exportOptions);
  const data = canvas.toDataURL(undefined, 1);
  return data;
};

export const rgbaToHex = (rgba: Array<number>, includeAlpha = true) => {
  // Validate input
  if (!Array.isArray(rgba) || rgba.length < 3 || rgba.length > 4) {
    throw new Error("Input must be an array of 3 or 4 numbers (RGB or RGBA)");
  }

  // Ensure values are within valid range (0-255)
  const validatedColors = rgba.map((value, index) => {
    // Handle alpha channel (0-1 range)
    if (index === 3) {
      return Math.min(Math.max(value, 0), 1) * 255;
    }
    return Math.min(Math.max(Math.round(value), 0), 255);
  });

  // Convert to hex and pad with zeros if necessary
  const hexValues = validatedColors.map((value) =>
    value.toString(16).padStart(2, "0")
  );

  // Return hex string with or without alpha channel
  const hex = includeAlpha
    ? hexValues.join("")
    : hexValues.slice(0, 3).join("");

  return `#${hex.toUpperCase()}`;
};
