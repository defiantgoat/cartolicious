import React from "react";
import useStyles from "./use-styles";
import Toolbar from "../Toolbar";
import MapContainer from "../MapContainer";
import MapboxLayer from "../MapboxLayer";

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Toolbar />
      <MapContainer>
        <MapboxLayer />
      </MapContainer>
    </div>
  );
};

export default App;
