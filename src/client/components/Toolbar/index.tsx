import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./use-styles";
import { APP_NAME, VERSION } from "../../config";
import { Button } from "@material-ui/core";
import { setCaroliciousStyles, setBackground } from "../../actions";
import { ReduxStateConfigProps } from "../../interfaces";
import { ENDPOINTS } from "../../config";
import {TEMP_CARTOLICIOUS_API_BAKED_TOKEN} from "../../keys";

const SaveButton: React.FC = () => {
  const currentStyles = useSelector(
    (state: ReduxStateConfigProps) => state.cartolicious_styles
  );

  const handleSave = () => {
    if (currentStyles) {
      // const styleObj = Object.fromEntries(currentStyles);
      console.log(currentStyles);
    }
  };

  return (
    <Button color="primary" variant="outlined" onClick={handleSave}>
      Save
    </Button>
  );
};

const Toolbar: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const fetchStyles = async () => {
    setLoading(true);
    try {
      const res = await fetch(ENDPOINTS.GET_STYLES(TEMP_CARTOLICIOUS_API_BAKED_TOKEN));
      const { data, errors } = await res.json();
      if (data.length > 0) {
        const [newStyles, background] = data;
        const newStyleMap = new Map();
        Object.entries(newStyles).forEach(([key, value]) =>
          newStyleMap.set(key, value)
        );
        dispatch(setCaroliciousStyles(newStyleMap));
        dispatch(setBackground(background));
      }
      if (errors.length > 0) {
        console.log(errors);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleRecolor = () => {
    fetchStyles();
  };

  return (
    <div className={classes.toolbar}>
      <h2 className={classes.title}>{APP_NAME}</h2>
      <div className={classes.buttonContainer}>
        {loading && <div style={{ color: "white" }}>Loading</div>}
        <Button color="primary" variant="outlined" onClick={handleRecolor}>
          Recolor
        </Button>
        {/* <SaveButton /> */}
      </div>
    </div>
  );
};

export default Toolbar;
