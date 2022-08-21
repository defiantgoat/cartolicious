import React, { useState } from "react";
import useStyles from "./use-styles";
import { APP_NAME } from "../../config";
import BrushIcon from "@material-ui/icons/BrushSharp";
import ToolbarButton from "../ToolbarButton";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";


const Toolbar: React.FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const { loadNewStyle } = useCartoliciousApi();

  const handleRecolor = async () => {
    await loadNewStyle();
  };

  return (
    <div className={classes.toolbar}>
      <div className={classes.titleContainer}>
        <h2 className={classes.title}>{APP_NAME}</h2>
      </div>

      <div className={classes.buttonsContainer}>
        {loading && <div style={{ color: "white" }}>Loading</div>}
        <div className={classes.buttonContainer}>
          <ToolbarButton onClickHandler={handleRecolor}>
            <BrushIcon />
          </ToolbarButton>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
