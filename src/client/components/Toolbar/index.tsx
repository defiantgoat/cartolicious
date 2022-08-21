import React, { useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "./use-styles";
import { APP_NAME } from "../../config";
import { ReduxStateConfigProps } from "../../interfaces";
import { useAuth0 } from "@auth0/auth0-react";
import BrushIcon from "@material-ui/icons/BrushSharp";
import ToolbarButton from "../ToolbarButton";
import MenuButton from "../MenuButton";
import { CircularProgress } from "@material-ui/core";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";


const Toolbar: React.FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const sidebarOpen = useSelector(
    (state: ReduxStateConfigProps) => state.sidebar_open
  );

  const { isLoading } = useAuth0();
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

        <div
          className={classes.buttonContainer}
          style={{ backgroundColor: sidebarOpen ? "#222" : "transparent" }}
        >
          {isLoading ? <CircularProgress color="primary" /> : <MenuButton />}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
