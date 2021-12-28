import React, { useLayoutEffect, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OLMap from "ol/Map";
import OLView from "ol/View";
import useStyles from "./use-styles";
import { ReduxStateConfigProps } from "../../interfaces";
import { MAP_CONFIG, ENDPOINTS } from "../../config";
import MapContainerContext from "../MapContainerContext";
import { setCaroliciousStyles, setBackground, setBusy } from "../../actions";
import { TEMP_CARTOLICIOUS_API_BAKED_TOKEN } from "../../keys";
import "ol/ol.css";

interface MapContainerProps {
  children?: React.ReactNode;
}


const MapContainer: React.FC<MapContainerProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { mapContainer } = useStyles();
  const [r, g, b, a] = useSelector(
    (state: ReduxStateConfigProps) => state.background
  );
  const token = useSelector(
    (state: ReduxStateConfigProps) => state.user.token
  );

  const [olMap, setOlMap] = useState(null as OLMap | null);

  const fetchStyles = async () => {
    dispatch(setBusy(true));
    try {
      const res = await fetch(
        ENDPOINTS.GET_STYLES, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data, errors } = await res.json();
      if (data.length > 0) {
        const [newStyles, background] = data;
        const newStyleMap = new Map();
        Object.entries(newStyles).forEach(([key, value]) =>
          newStyleMap.set(key, value)
        );
        dispatch(setCaroliciousStyles(newStyleMap));
        dispatch(setBackground(background));
      }
      if (errors.length > 0) {
        console.log(errors);
      }
    } catch (e) {
    } finally {
      dispatch(setBusy(false));
    }
  };

  useEffect(() => {
    if (token > "") {
      fetchStyles();
    }
  }, [token])

  useLayoutEffect(() => {
    const view = new OLView({
      center: MAP_CONFIG.DEFAULT_CENTER,
      zoom: MAP_CONFIG.DEFAULT_ZOOM,
      maxZoom: MAP_CONFIG.MAX_ZOOM,
      minZoom: MAP_CONFIG.MIN_ZOOM,
      constrainResolution: true,
    });

    const map = new OLMap({
      view,
      target: "map",
    });

    setOlMap(map);

    return () => {
      setOlMap(null);
    };
  }, []);

  return (
    <MapContainerContext.Provider value={olMap}>
      <div
        id="map"
        className={mapContainer}
        style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
      >
        {olMap && children}
      </div>
    </MapContainerContext.Provider>
  );
};

export default MapContainer;
