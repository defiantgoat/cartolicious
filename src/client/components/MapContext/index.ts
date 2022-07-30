import React, { createContext } from "react";

const MapContext: React.Context<any> = createContext(null);
MapContext.displayName = "MapContext";

export default MapContext;
