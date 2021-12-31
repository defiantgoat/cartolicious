import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./use-styles";
import { APP_NAME, VERSION } from "../../config";
import { Button } from "@material-ui/core";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import UserButton from "../UserButton";
import { setCaroliciousStyles, setBackground } from "../../actions";
import { ReduxStateConfigProps } from "../../interfaces";
import { ENDPOINTS } from "../../config";
import {objectFromMap} from "../../lib/utils";

const SaveButton: React.FC = () => {
  const { token, loggedIn, id } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );
  const currentStyles = useSelector(
    (state: ReduxStateConfigProps) => state.cartolicious_styles
  );
  const currentBackground = useSelector(
    (state: ReduxStateConfigProps) => state.background
  );

  const handleSave = async () => {
    if (currentStyles) {
      const styles = objectFromMap(currentStyles);
      console.log(styles);
      const saveStyle = await fetch(ENDPOINTS.STYLES, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user_id: id,
          styles: {
            ...styles,
            background: currentBackground
          }
        }),
      });

      const { status, data, errors } = await saveStyle.json();

      console.log(status, data, errors);
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
  const { token, loggedIn } = useSelector(
    (state: ReduxStateConfigProps) => state.user
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
      <h2 className={classes.title}>{APP_NAME}</h2>
      <div className={classes.buttonContainer}>
        {loading && <div style={{ color: "white" }}>Loading</div>}
        <Button color="primary" variant="outlined" onClick={handleRecolor}>
          Recolor
        </Button>
        { loggedIn && 
          <>
            <SaveButton />
            <LogoutButton />
          </>
        }        
        <UserButton />
      </div>
    </div>
  );
};

export default Toolbar;
