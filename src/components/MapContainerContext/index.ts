import React, { createContext } from 'react'

const MapContainerContext: React.Context<any> = createContext(null);
MapContainerContext.displayName = 'MapContainer';

export default MapContainerContext;
