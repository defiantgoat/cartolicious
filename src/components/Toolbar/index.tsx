import React from "react";
import { useDispatch } from "react-redux";
import useStyles from "./use-styles";
import { APP_NAME } from "../../config";
import { Button } from "@material-ui/core";
import { generateRandomCartoliciousStyles } from "../../cartolicious/styles";
import {randomRGBAGenerator} from "../../cartolicious/utils";
import {setCaroliciousStyles, setBackground} from "../../actions";

const Toolbar: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleRecolor = () => {
    const newColors = generateRandomCartoliciousStyles();
    const newBackground = randomRGBAGenerator();
    dispatch(setCaroliciousStyles(newColors));
    dispatch(setBackground(newBackground));
  };

  return (
    <div className={classes.toolbar}>
      <h2 className={classes.title}>{APP_NAME}</h2>
      <Button color="primary" variant="outlined" onClick={handleRecolor}>Recolor</Button>
    </div>
  );
};

export default Toolbar;
