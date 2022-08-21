import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { ReduxStateConfigProps } from "../../interfaces";
import MapContext from "../MapContext";
import useStyles from "./use-styles";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";
import "ol/ol.css";

interface MapContainerProps {
  children?: React.ReactNode;
}

const MapContainer: React.FC<MapContainerProps> = ({ children }) => {
  const map = useContext(MapContext);
  const { mapContainer } = useStyles();
  const [r, g, b, a] = useSelector(
    (state: ReduxStateConfigProps) => state.background
  );
  const { loadNewStyle } = useCartoliciousApi();

  const fetchStyle = async () => {
    await loadNewStyle();
  };

  useEffect(() => {
    fetchStyle();
  }, []);

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
