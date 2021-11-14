import React from "react";
import useStyles from "./use-styles";
import { APP_NAME } from "../../config";

const Toolbar: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.toolbar}>
      <h2 className={classes.title}>{APP_NAME}</h2>
    </div>
  );
};

export default Toolbar;
