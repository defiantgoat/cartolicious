import React, { useLayoutEffect, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OLMap from "ol/Map";
import OLView from "ol/View";
import useStyles from "./use-styles";
import OLProjection from 'ol/proj/Projection';
import { ReduxStateConfigProps } from "../../interfaces";
import { MAP_CONFIG, ENDPOINTS } from "../../config";
import MapContainerContext from "../MapContainerContext";
import { setCaroliciousStyles, setBackground, setBusy } from "../../actions";
import Toolbar from "../Toolbar";
import "ol/ol.css";
import { mapFromObject } from "../../lib/utils";


interface MapContainerProps {
  children?: React.ReactNode;
}

const MapContainer: React.FC<MapContainerProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { mapContainer } = useStyles();
  const [r, g, b, a] = useSelector(
    (state: ReduxStateConfigProps) => state.background
  );
  const { id, token, styles, curations, loggedIn } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  const [olMap, setOlMap] = useState(null as OLMap | null);

  const loadStyle = async (id: string) => {
    try {
      const loadedStyle = await fetch(`${ENDPOINTS.STYLES}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await loadedStyle.json();
      const [style] = data;
      const { background } = style;
      const styleMap = mapFromObject(style);
      dispatch(setCaroliciousStyles(styleMap));
      dispatch(setBackground(background || [0, 0, 0, 1]));
    } catch (e) {
    } finally {
    }
  };

  const loadCuration = async (id: string) => {
    try {
      const loadedStyle = await fetch(`${ENDPOINTS.CURATIONS}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await loadedStyle.json();
      console.log(data);
      const [curation] = data;
      const {lat, long, style: {json}, zoom} = curation;
      const { background } = json;
      const styleMap = mapFromObject(json);
      olMap!.getView().setCenter([long, lat]);
      olMap!.getView().setZoom(zoom);
      dispatch(setCaroliciousStyles(styleMap));
      dispatch(setBackground(background || [0, 0, 0, 1]));
    } catch (e) {
    } finally {
    }
  };

  const fetchStyles = async () => {
    dispatch(setBusy(true));
    try {
      const res = await fetch(ENDPOINTS.STYLES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
  }, [token]);

  useLayoutEffect(() => {
    const view = new OLView({
      center: MAP_CONFIG.DEFAULT_CENTER,
      zoom: MAP_CONFIG.DEFAULT_ZOOM,
      maxZoom: MAP_CONFIG.MAX_ZOOM,
      minZoom: MAP_CONFIG.MIN_ZOOM,
      constrainResolution: true
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
      <Toolbar />
      <div
        id="map"
        className={mapContainer}
        style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
      >
        {olMap && children}
      </div>
      {
        <div style={{ height: "50px" }}>
          {styles.map(({ id }, i) => (
            <button key={`style-${i}`} onClick={() => loadStyle(id)}>
              {id}
            </button>
          ))}
          <br />
          {curations.map(({ id }, i) => (
            <button key={`curation-${i}`} onClick={() => loadCuration(id)}>
              {`C-${id}`}
            </button>
          ))}
        </div>
      }
    </MapContainerContext.Provider>
  );
};

export default MapContainer;
