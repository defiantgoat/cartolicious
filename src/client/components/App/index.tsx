import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./use-styles";
import OLMap from "ol/Map";
import OLView from "ol/View";
import MapContainer from "../MapContainer";
import MapboxLayer from "../MapboxLayer";
import MapContext from "../MapContext";
import Toolbar from "../Toolbar";
import Sidebar from "../Sidebar";
import { MAP_CONFIG } from "../../config";
import { ReduxStateConfigProps } from "../../interfaces";


const App: React.FC = () => {
  const classes = useStyles();
  const sidebarOpen = useSelector(
    (state: ReduxStateConfigProps) => state.sidebar_open
  );
  const busy = useSelector((state: ReduxStateConfigProps) => state.busy);
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

  useEffect(() => {
    olMap?.updateSize();
  }, [sidebarOpen]);

  return (
    <MapContext.Provider value={olMap}>
      <div className={classes.app}>
        <Toolbar />
        <div className={classes.mainContent}>
          <MapContainer>
            {busy && <div className={classes.busyIndicator}>Loading</div>}
            <MapboxLayer />
          </MapContainer>
          {sidebarOpen && <Sidebar />}
        </div>
      </div>
    </MapContext.Provider>
  );
};

export default App;
