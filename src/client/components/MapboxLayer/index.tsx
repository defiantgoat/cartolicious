import React, { useContext, useEffect, useRef, useCallback } from "react";
import OLVectorTileLayer from "ol/layer/VectorTile";
import OLVectorTile from "ol/source/VectorTile";
import { Fill, Stroke, Style } from "ol/style.js";
import MVT from "ol/format/MVT.js";
import { createXYZ, extentFromProjection } from "ol/tilegrid";
import { MAPBOX_TOKEN } from "../../keys";
import MapContainerContext from "../MapContainerContext";
import { useSelector } from "react-redux";
import { ReduxStateConfigProps, CartoliciousStyles } from "../../interfaces";

const MAPBOX_FEATURE_TYPES = {
  CLASS: "class",
  TYPE: "type",
  LAYER: "layer",
};

const mapboxTileUrlFunction = ([z, x, y]) => {
  const domain = "abcd".substr(((x << z) + y) % 4, 1);

  const url = `https://${domain}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v8/${z}/${x}/${y}.mvt?access_token=${MAPBOX_TOKEN}`;

  return url;
};

const MapboxLayer: React.FC = () => {
  const map = useContext(MapContainerContext);
  const layer = useRef(null as OLVectorTileLayer | null);
  const source = useRef(null as OLVectorTile | null);
  const stylesRef = useRef({});
  const format = new MVT();

  const cartolicious = useSelector(
    (state: ReduxStateConfigProps) => state.cartolicious_styles
  );

  const mapboxStyleFunction = (
    feature: any,
    cartoliciousStyleMap: CartoliciousStyles
  ) => {
    const featureLabel =
      feature.get(MAPBOX_FEATURE_TYPES.CLASS) ||
      feature.get(MAPBOX_FEATURE_TYPES.TYPE) ||
      feature.get(MAPBOX_FEATURE_TYPES.LAYER);

    if (stylesRef.current[featureLabel]) {
      return stylesRef.current[featureLabel];
    }

    // if (!cartoliciousStyleMap.get(featureLabel)) {
    //   console.log(featureLabel);
    // }

    const featureStyle =
      cartoliciousStyleMap.get(featureLabel) ||
      cartoliciousStyleMap.get("default");

    if (!featureStyle) {
      return;
    }

    const [fill, stroke, visible] = featureStyle;

    if (visible && visible < 1) {
      return;
    }

    const style = new Style();

    if (stroke) {
      const [r, g, b, alpha, visible, width] = stroke;
      if (visible && visible > 0) {
        const featureStroke = new Stroke({
          color: [r, g, b] as any[],
          width,
        });
        style.setStroke(featureStroke);
      }
    }

    if (fill) {
      const [r, g, b, alpha, visible] = fill;
      if (visible && visible > 0) {
        const featureFill = new Fill({
          color: [r, g, b] as any[],
        });
        style.setFill(featureFill);
      }
    }

    stylesRef.current[featureLabel] = style;

    return style;
  };

  const setStyles = useCallback(() => {
    if (layer.current && cartolicious) {
      layer.current.setStyle((feature) =>
        mapboxStyleFunction(feature, cartolicious)
      );
    }
  }, [cartolicious]);

  useEffect(() => {
    if (layer.current && cartolicious) {
      stylesRef.current = {};
      setStyles();
    }
  }, [cartolicious]);

  const mapboxTileLoadFunction = (tile, src) => {
    tile.setLoader(async (extent, resolution, projection) => {
      const data = await fetch(src);
      const array = await data.arrayBuffer();
      const format = tile.getFormat();
      const features = format.readFeatures(array, {
        extent,
        featureProjection: projection,
      });

      tile.setFeatures(features);
    });
  };

  useEffect(() => {
    if (map) {
      const tileSize = [256, 256];
      const projection = map.getView().getProjection();
      const tileGrid = createXYZ({
        extent: extentFromProjection(projection),
        tileSize,
      });

      source.current = new OLVectorTile({
        projection,
        format,
        tileSize,
        tileGrid,
        tileUrlFunction: mapboxTileUrlFunction,
        tileLoadFunction: mapboxTileLoadFunction,
      });

      layer.current = new OLVectorTileLayer({
        source: source.current,
      });

      map.addLayer(layer.current);
    }

    return () => {
      if (map) {
        map.removeLayer(layer.current);
        layer.current = null;
      }
    };
  }, [map]);

  return null;
};

export default MapboxLayer;
