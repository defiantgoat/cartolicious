import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
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
import { setUserId, setUserContent } from "../../actions";
import useQueryString from "../../hooks/useQueryString";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";
import useUser from "../../hooks/useUser";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import FirebaseContext from "../Firebase/context";

const App: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(
    (state: ReduxStateConfigProps) => state.sidebar_open
  );
  const busy = useSelector((state: ReduxStateConfigProps) => state.busy);
  const firebaseApp = useContext(FirebaseContext);

  const { token, user_id, setUser, loggedIn, uid } = useUser();

  const [olMap, setOlMap] = useState(null as OLMap | null);

  const { getTemporaryAccess } = useCartoliciousApi();

  const getUserContent = async ({ user_id, token }) => {
    if (!user_id || !token) {
      return;
    }
    try {
      const userContent = await fetch(`${ENDPOINTS.USER}/${user_id}/content`, {
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
    if (user_id && token > "") {
      getUserContent({ user_id, token });
    }
  }, [user_id, token]);

  const getUserMetadata = async ({
    uid,
    token,
  }: {
    uid?: string;
    token?: string;
  }) => {
    if (!uid || !token) {
      return;
    }

    try {
      const userDetailsByIdUrl = `${ENDPOINTS.USER}/${uid}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { status, data, errors } = await metadataResponse.json();

      if (status === 200) {
        const [_id] = data;
        dispatch(setUserId(_id));
      }
      if (errors && errors.length) {
        console.log(errors);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (loggedIn && token && uid) {
      getUserMetadata({ uid, token });
    }
  }, [loggedIn, token, uid]);

  useEffect(() => {
    const handleUserInfo = async (user: User) => {
      const accessToken = await user?.getIdToken();
      setUser({
        uid: user?.uid,
        loggedIn: true,
        details: user,
        token: accessToken,
        email: user?.email,
      });
    };

    if (firebaseApp) {
      const auth = getAuth(firebaseApp);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          handleUserInfo(user);
        } else {
          console.log("no user");
        }
      });
      return unsubscribe;
    }
    return () => null;
  }, [firebaseApp]);

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
