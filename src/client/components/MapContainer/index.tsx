import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStateConfigProps } from "../../interfaces";
import MapContext from "../MapContext";
import { ENDPOINTS } from "../../config";
import { setCaroliciousStyles, setBackground, setBusy } from "../../actions";
import useQueryString from "../../hooks/useQueryString";
import useStyles from "./use-styles";
import "ol/ol.css";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";

interface MapContainerProps {
  children?: React.ReactNode;
}

const MapContainer: React.FC<MapContainerProps> = ({ children }) => {
  const map = useContext(MapContext);
  const { mapContainer } = useStyles();
  const [r, g, b, a] = useSelector(
    (state: ReduxStateConfigProps) => state.background
  );

  const { loadNewStyle, loadCurationByHash } = useCartoliciousApi();

  const fetchStyle = async () => {
    await loadNewStyle();
  };

  const fetchCuration = async (hash: string) => {
    await loadCurationByHash(hash);
  };

  useEffect(() => {
    if (map) {
      const { curation } = useQueryString();
      if (curation) {
        fetchCuration(curation);
      } else {
        fetchStyle();
      }
    }
  }, [map]);

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
