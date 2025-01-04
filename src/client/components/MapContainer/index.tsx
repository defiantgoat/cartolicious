import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { ReduxStateConfigProps } from "../../interfaces";
import MapContext from "../MapContext";
import useQueryString from "../../hooks/useQueryString";
import { MapContainerRoot } from "./styled-components";
import "ol/ol.css";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";

interface MapContainerProps {
  children?: React.ReactNode;
}

const MapContainer: React.FC<MapContainerProps> = ({ children }) => {
  const map = useContext(MapContext);
  const [r, g, b, a] = useSelector(
    (state: ReduxStateConfigProps) => state.background
  );

  const { loadNewStyle, loadCurationByHash } = useCartoliciousApi();

  const fetchStyle = async () => {
    // await loadNewStyle();
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
  }, [map, window.location.search]);

  return (
    <>
      <MapContainerRoot
        id="map"
        $backgroundColor={`rgba(${r}, ${g}, ${b}, ${a})`}
      >
        {map && children}
      </MapContainerRoot>
    </>
  );
};

export default MapContainer;
