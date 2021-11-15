import React, { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OLMap from "ol/Map";
import OLView from "ol/View";
import OLTileGrid from "ol/tilegrid/TileGrid";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import useStyles from "./use-styles";
import { ReduxStateConfigProps } from "../../interfaces";
import { MAP_CONFIG } from "../../config";
import MapContainerContext from "../MapContainerContext";
import "ol/ol.css";

interface MapContainerProps {
  children?: React.ReactNode;
}

const MapContainer: React.FC<MapContainerProps> = ({
  children,
}: MapContainerProps) => {
  const { mapContainer } = useStyles();
  const [r, g, b, a] = useSelector(
    (state: ReduxStateConfigProps) => state.background
  );

  const [olMap, setOlMap] = useState(null as OLMap | null);

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
