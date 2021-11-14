import React, { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OLMap from "ol/Map";
import OLView from "ol/View";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import useStyles from "./use-styles";
import {ReduxStateConfigProps} from "../../interfaces";
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
    const map = new OLMap({
      view: new OLView({
        center: [0, 0],
        zoom: 1,
        constrainResolution: true,
      }),
      target: "map",
      layers: [
        // new TileLayer({
        //   source: new OSM(),
        // })
      ],
    });

    setOlMap(map);

    return () => {
      setOlMap(null);
    };
  }, []);

  return (
    <MapContainerContext.Provider value={olMap}>
      <div id="map" className={mapContainer} style={{backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`}}>
        {olMap && children}
      </div>
    </MapContainerContext.Provider>
  );
};

export default MapContainer;
