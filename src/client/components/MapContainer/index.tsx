import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import MapContext from "../MapContext";
import useQueryString from "../../hooks/useQueryString";
import { MapContainerRoot } from "./styled-components";
import "ol/ol.css";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";
import useUser from "../../hooks/useUser";

interface MapContainerProps {
  children?: React.ReactNode;
}

const MapContainer: React.FC<MapContainerProps> = ({ children }) => {
  const map = useContext(MapContext);
  const [r, g, b, a] = useSelector((state: any) => state.root.background);

  const { anonymous, logged_in } = useUser();

  const { loadCurationByHash, getDailyCuration, loadNewStyle } =
    useCartoliciousApi();

  const fetchStyle = async () => {
    await loadNewStyle();
  };

  const fetchDailyCuration = async () => {
    await getDailyCuration();
  };

  const fetchCuration = async (hash: string) => {
    await loadCurationByHash(hash);
  };

  useEffect(() => {
    if (map) {
      const { curation } = useQueryString();
      if (curation) {
        fetchCuration(curation);
      }
    }
  }, [map, window.location.search]);

  useEffect(() => {
    console.log({ anonymous, logged_in, map });
    if (map && anonymous && !logged_in) {
      fetchDailyCuration();
      return;
    }
    if (map && logged_in) {
      fetchStyle();
      return;
    }
  }, [anonymous, map, logged_in]);

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
