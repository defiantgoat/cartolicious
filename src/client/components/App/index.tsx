import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./use-styles";
import OLMap from "ol/Map";
import OLView from "ol/View";
import MapContainer from "../MapContainer";
import MapboxLayer from "../MapboxLayer";
import MapContext from "../MapContext";
import Toolbar from "../Toolbar";
import Sidebar from "../Sidebar";
import EditCurationsDialog from "../EditCurationsDialog";
import { MAP_CONFIG, ENDPOINTS } from "../../config";
import { ReduxStateConfigProps } from "../../interfaces";
import { setUser, setToken, setUserId, setUserContent } from "../../actions";
import { useAuth0 } from "@auth0/auth0-react";
import useQueryString from "../../hooks/useQueryString";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";

const App: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(
    (state: ReduxStateConfigProps) => state.sidebar_open
  );
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const busy = useSelector((state: ReduxStateConfigProps) => state.busy);
  const { id, token, loggedIn } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );
  const [olMap, setOlMap] = useState(null as OLMap | null);

  const { getTemporaryAccess } = useCartoliciousApi();

  const getUserMetadata = async () => {
    const domain = "api.cartolicious.com/";

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${domain}`,
          scope: "get:styles",
        },
      });

      dispatch(setToken(accessToken));

      const userDetailsByIdUrl = `${ENDPOINTS.USER}/${user?.sub}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { status, data, errors } = await metadataResponse.json();

      if (status !== 200) {
        const [error] = errors;

        if (error === "User does not exist" && user) {
          const { sub, given_name, family_name, email } = user;
          const newUser = await fetch(ENDPOINTS.USER, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              sub,
              given_name,
              family_name,
              email,
            }),
          });

          const { status, data, errors } = await newUser.json();
          if (status === 200) {
            const [userData] = data;
            const { id } = userData;
            dispatch(setUserId(id));
          }
        }
      } else {
        const [id] = data;
        dispatch(setUserId(id));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const getUserContent = async () => {
    try {
      const userContent = await fetch(`${ENDPOINTS.USER}/${id}/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await userContent.json();
      const [styles, curations] = data;
      dispatch(setUserContent({ styles, curations }));
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  useEffect(() => {
    dispatch(
      setUser({
        loggedIn: isAuthenticated,
        token: "",
        details: user,
      })
    );

    if (user && isAuthenticated) {
      getUserMetadata();
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (id > -1 && token > "") {
      getUserContent();
    }
  }, [id, token]);

  useEffect(() => {
    const getAdvanced = async (CZZ3od9pCxZNEtzW: string) => {
      await getTemporaryAccess(CZZ3od9pCxZNEtzW);
    };

    const { CZZ3od9pCxZNEtzW } = useQueryString();

    if (CZZ3od9pCxZNEtzW) {
      getAdvanced(CZZ3od9pCxZNEtzW);
    }
  }, [window.location.search]);

  useLayoutEffect(() => {
    const view = new OLView({
      center: MAP_CONFIG.DEFAULT_CENTER,
      zoom: MAP_CONFIG.DEFAULT_ZOOM,
      maxZoom: MAP_CONFIG.MAX_ZOOM,
      minZoom: MAP_CONFIG.MIN_ZOOM,
      constrainResolution: true,
    });

    const map = new OLMap({
      view,
      target: "map",
    });

    setOlMap(map);

    return () => {
      setOlMap(null);
    };
  }, []);

  useEffect(() => {
    olMap?.updateSize();
  }, [sidebarOpen]);

  return (
    <MapContext.Provider value={olMap}>
      <div className={classes.app}>
        <EditCurationsDialog />
        <Toolbar />
        <div className={classes.mainContent}>
          <MapContainer>
            {busy && <div className={classes.busyIndicator}>Loading</div>}
            <MapboxLayer />
          </MapContainer>
          {sidebarOpen && <Sidebar />}
        </div>
      </div>
    </MapContext.Provider>
  );
};

export default App;
