import React from "react";
import { useSelector } from "react-redux";
import useStyles from "./use-styles";
import Toolbar from "../Toolbar";
import MapContainer from "../MapContainer";
import MapboxLayer from "../MapboxLayer";
import { ReduxStateConfigProps } from "../../interfaces";

const App: React.FC = () => {
  const classes = useStyles();
  const busy = useSelector((state: ReduxStateConfigProps) => state.busy);

  return (
    <div className={classes.app}>
      <Toolbar />
      <MapContainer>
        {busy && <div className={classes.busyIndicator}>Loading</div>}
        <MapboxLayer />
      </MapContainer>
    </div>
  );
};

export default App;
