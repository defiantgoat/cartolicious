import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "./use-styles";
import { APP_NAME } from "../../config";
import { ReduxStateConfigProps } from "../../interfaces";
import { ENDPOINTS } from "../../config";
import MenuButton from "../MenuButton";
import { CircularProgress } from "@material-ui/core";
import FirebaseContext from "../Firebase/context";
import useUser from "../../hooks/useUser";
import useCartoliciousStyles from "../../hooks/useCartoliciousStyles";
import { LiciousToolbarButton } from "@licious/react";

const Toolbar: React.FC = () => {
  const firebaseApp = useContext(FirebaseContext);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const { token, logged_in } = useUser();
  const { setCaroliciousStyles, setBackground } = useCartoliciousStyles();

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
        setCaroliciousStyles({
          styleMap: newStyleMap,
          resetStyleId: true,
          resetCurationId: true,
        });
        setBackground(background);
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
            <LiciousToolbarButton
              icon="paint"
              size="md"
              onClick={handleRecolor}
            />
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
