import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStateConfigProps } from "../../interfaces";
import MapContext from "../MapContext";
import useStyles from "./use-styles";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";
import { setBusy } from "../../actions";
import "ol/ol.css";
import useQueryString from "../../hooks/useQueryString";

interface MapContainerProps {
  children?: React.ReactNode;
}

const MapContainer: React.FC<MapContainerProps> = ({ children }) => {
  const map = useContext(MapContext);
  const dispatch = useDispatch();
  const { mapContainer } = useStyles();
  const [r, g, b, a] = useSelector(
    (state: ReduxStateConfigProps) => state.background
  );
  const { loadNewStyle, loadCurationByHash } = useCartoliciousApi();

  const fetchStyle = async () => {
    dispatch(setBusy(true));
    await loadNewStyle();
    dispatch(setBusy(false));
  };

  const fetchCuration = async(hash) => {
    dispatch(setBusy(true));

    await loadCurationByHash(hash);
    dispatch(setBusy(false));

  }

  const queryString = window.location.search;
  // const searchParams = new URLSearchParams(queryString);

  useEffect(() => {
    if (map) {
      const searchParams = new URLSearchParams(queryString);
      const params = [...searchParams];
  
  
      if (params.length > 0) {
        const [type, hash] = params[0];
        console.log(type,hash)
        fetchCuration(hash);
      } else {
        fetchStyle();
      }
    }
  }, [queryString, map]);

  // useEffect(() => {
  //   fetchStyle();
  // }, []);

  return (
    <>
      <div
        id="map"
        className={mapContainer}
        style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
      >
        {map && children}
      </div>
    </>
  );
};

export default MapContainer;
