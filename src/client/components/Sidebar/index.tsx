import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import useStyles from "./use-styles";
import MapContext from "../MapContext";
import LogoutButton from "../LogoutButton";
import LoginButton from "../LoginButton";
import { ENDPOINTS } from "../../config";
import { ReduxStateConfigProps } from "../../interfaces";
import { setCaroliciousStyles, setBackground } from "../../actions";
import { mapFromObject, objectFromMap } from "../../lib/utils";
import SidebarSection from "../SidebarSection";

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
            background: currentBackground,
          },
        }),
      });

      const { status, data, errors } = await saveStyle.json();

      console.log(status, data, errors);
    }
  };

  return (
    <Button color="primary" variant="outlined" onClick={handleSave}>
      Save Style
    </Button>
  );
};

const SaveCuration: React.FC = () => {
  const map = useContext(MapContext);

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
    if (currentStyles && map) {
      const styles = objectFromMap(currentStyles);
      const [long, lat] = map.getView().getCenter();
      const zoom = map.getView().getZoom();
      const saveCuration = await fetch(ENDPOINTS.CURATIONS, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user_id: id,
          style_id: null,
          lat,
          long,
          zoom,
          name: null,
          shared: true,
          styles: {
            ...styles,
            background: currentBackground,
          },
        }),
      });

      const { status, data, errors } = await saveCuration.json();

      console.log(status, data, errors);
    }
  };

  return (
    <Button color="primary" variant="outlined" onClick={handleSave}>
      Save Curation
    </Button>
  );
};

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const busy = useSelector((state: ReduxStateConfigProps) => state.busy);
  const { token, styles, curations, details, loggedIn } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );
  const map = useContext(MapContext);

  const loadStyle = async (id: string) => {
    try {
      const loadedStyle = await fetch(`${ENDPOINTS.STYLES}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await loadedStyle.json();
      const [style] = data;
      const { background } = style;
      const styleMap = mapFromObject(style);
      dispatch(setCaroliciousStyles(styleMap));
      dispatch(setBackground(background || [0, 0, 0, 1]));
    } catch (e) {
    } finally {
    }
  };

  const loadCuration = async (id: string) => {
    try {
      const loadedStyle = await fetch(`${ENDPOINTS.CURATIONS}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await loadedStyle.json();
      console.log(data);
      const [curation] = data;
      const {
        lat,
        long,
        style: { json },
        zoom,
      } = curation;
      const { background } = json;
      const styleMap = mapFromObject(json);
      map?.getView().setCenter([long, lat]);
      map?.getView().setZoom(zoom);
      dispatch(setCaroliciousStyles(styleMap));
      dispatch(setBackground(background || [0, 0, 0, 1]));
    } catch (e) {
    } finally {
    }
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarContent}>
        {!loggedIn ? (
          <LoginButton />
        ) : (
          <>
            <SidebarSection header="Your Styles">
              <SaveButton />
              {styles.map(({ id }, i) => (
                <button key={`style-${i}`} onClick={() => loadStyle(id)}>
                  {id}
                </button>
              ))}
            </SidebarSection>
            <div className={classes.sectionContent}>
              <h2>Your Curations</h2>
              <SaveCuration />
              {curations.map(({ id }, i) => (
                <button key={`curation-${i}`} onClick={() => loadCuration(id)}>
                  {`C-${id}`}
                </button>
              ))}
            </div>
            <div className={classes.sectionContent}>
              <h2>Edit Style</h2>
              dropddown here
            </div>
          </>
        )}
      </div>

      <div className={classes.profileContainer}>
        {loggedIn && (
          <>
            <div
              style={{
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              <img
                className={classes.profilePicture}
                src={details["picture"]}
              />
              <span>{details["name"]}</span>
            </div>
            <div
              style={{ display: "flex", flexGrow: 1, justifyContent: "end" }}
            >
              <LogoutButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
