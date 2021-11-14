import { randomRGBAGenerator } from "./utils";
import {
  CartoliciousFill,
  CartoliciousStroke,
  CartoliciousStyle,
} from "../interfaces";

const emptyStyle: CartoliciousStyle = [[], [], 0];

const defaultCartoliciousStyle: CartoliciousStyle = [
  [34, 22, 200, 1, 1],
  [100, 45, 233, 1, 0, 1],
  1,
];

export const mapboxAttributes: Set<string> = new Set([
  "runway",
  "taxiway",
  "apron",
  "helipad",
  "landuse",
  "building",
  "national_park",
  "wetland",
  "wetland_noveg",
  "aboriginal_lands",
  "agriculture",
  "airport",
  "cemetery",
  "glacier",
  "grass",
  "hospital",
  "park",
  "piste",
  "pitch",
  "rock",
  "sand",
  "school",
  "scrub",
  "wood",
  "motorway",
  "motorway_link",
  "trunk",
  "trunk_link",
  "primary",
  "primary_link",
  "secondary",
  "secondary_link",
  "tertiary",
  "tertiary_link",
  "street",
  "street_limited",
  "pedestrian",
  "construction",
  "track",
  "service",
  "ferry",
  "path",
  "major_rail",
  "minor_rail",
  "service_rail",
  "aerialway",
  "golf",
  "roundabout",
  "mini_roundabout",
  "turning_circle",
  "turning_loop",
  "traffic_signals",
  "cliff",
  "fence",
  "gate",
  "hedge",
  "land",
  "water",
  "river",
  "canal",
  "stream",
  "drain",
  "ditch",
]);

export const generateEmptyCartoliciousStyles = (): Map<
  string,
  CartoliciousStyle
> => {
  const newStyleMap = new Map().set("default", emptyStyle);

  mapboxAttributes.forEach((attribute) => {
    newStyleMap.set(attribute, emptyStyle);
  });

  return newStyleMap;
};

export const generateRandomCartoliciousStyles = (): Map<
  string,
  CartoliciousStyle
> => {
  const newStyleMap = new Map().set("default", defaultCartoliciousStyle);

  mapboxAttributes.forEach((attribute) => {
    const newCartoliciousStyle: CartoliciousStyle = [
      [...randomRGBAGenerator(), 1],
      [...randomRGBAGenerator(), 1, 1],
      1,
    ];

    newStyleMap.set(attribute, newCartoliciousStyle);
  });

  return newStyleMap;
};
