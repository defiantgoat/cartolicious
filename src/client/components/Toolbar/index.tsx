import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./use-styles";
import { APP_NAME } from "../../config";
import { setCaroliciousStyles, setBackground } from "../../actions";
import { ReduxStateConfigProps } from "../../interfaces";
import { ENDPOINTS } from "../../config";
import BrushIcon from "@material-ui/icons/BrushSharp";
import ToolbarButton from "../common/ToolbarButton";
import MenuButton from "../MenuButton";
import { CircularProgress } from "@material-ui/core";
import FirebaseContext from "../Firebase/context";
import useUser from "../../hooks/useUser";

const Toolbar: React.FC = () => {
  const firebaseApp = useContext(FirebaseContext);

  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const { token, logged_in } = useUser();

  const sidebarOpen = useSelector(
    (state: ReduxStateConfigProps) => state.sidebar_open
  );

  const fetchStyles = async () => {
    setLoading(true);
    try {
      const res = await fetch(ENDPOINTS.STYLES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data, errors } = await res.json();
      if (data.length > 0) {
        const [newStyles, background] = data;
        const newStyleMap = new Map();
        Object.entries(newStyles).forEach(([key, value]) =>
          newStyleMap.set(key, value)
        );
        dispatch(setCaroliciousStyles({ styleMap: newStyleMap }));
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
      <div className={classes.titleContainer}>
        <h2 className={classes.title}>{APP_NAME}</h2>
      </div>

      <div className={classes.buttonsContainer}>
        {loading && (
          <div
            className={classes.buttonContainer}
            style={{ backgroundColor: "transparent" }}
          >
            <CircularProgress
              color="primary"
              size={"sm"}
              style={{ width: "2rem" }}
            />
          </div>
        )}
        {logged_in ? (
          <div className={classes.buttonContainer}>
            <ToolbarButton onClickHandler={handleRecolor}>
              <BrushIcon />
            </ToolbarButton>
          </div>
        ) : null}
        {firebaseApp ? (
          <div
            className={classes.buttonContainer}
            style={{ backgroundColor: sidebarOpen ? "#222" : "transparent" }}
          >
            <MenuButton />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Toolbar;
