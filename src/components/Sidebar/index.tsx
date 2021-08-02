import React from 'react';
import useStyles from './use-styles';
import {APP_NAME} from '../../config';

const Sidebar: React.FC = () => {
  const classes = useStyles();
  return (
    <div
      className={classes.sidebar}
    >
      <h2 className={classes.title}>{ APP_NAME }</h2>
    </div>
  )
};

export default Sidebar;