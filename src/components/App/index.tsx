import React from 'react';
import useStyles from './use-styles';
import Sidebar from '../Sidebar';
import MapContainer from '../MapContainer';

const App: React.FC = () =>  {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Sidebar />
      <MapContainer />
    </div>
  );
};

export default App;
