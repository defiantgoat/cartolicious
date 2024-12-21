import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./use-styles";
import { APP_NAME } from "../../config";
import { Button, IconButton } from "@material-ui/core";
import { setCaroliciousStyles, setBackground } from "../../actions";
import { ReduxStateConfigProps } from "../../interfaces";
import { ENDPOINTS } from "../../config";
import { useAuth0 } from "@auth0/auth0-react";
import BrushIcon from "@material-ui/icons/BrushSharp";
import ToolbarButton from "../ToolbarButton";
import MenuButton from "../MenuButton";
import EngageButton from "./EngageButton";
import { CircularProgress } from "@material-ui/core";
import FirebaseContext from "../Firebase/context";
import useUser from "../../hooks/useUser";
import UserButton from "./UserButton";

const Toolbar: React.FC = () => {
  const firebaseApp = useContext(FirebaseContext);

  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const { user, token, loggedIn } = useUser();

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
      <div className={classes.titleContainer}>
        <h2 className={classes.title}>{APP_NAME}</h2>
      </div>

      <div className={classes.buttonsContainer}>
        {loading && <div style={{ color: "white" }}>Loading</div>}
        {loggedIn ? (
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
            {loggedIn ? <MenuButton /> : <MenuButton />}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Toolbar;
