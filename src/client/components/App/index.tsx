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

  const { user, setUser } = useUser();

  const [olMap, setOlMap] = useState(null as OLMap | null);

  const { getTemporaryAccess } = useCartoliciousApi();

  const getUserMetadata = async () => {
    const domain = "api.cartolicious.com/";

    try {
      const userDetailsByIdUrl = `${ENDPOINTS.USER}/${user?.uid}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const { status, data, errors } = await metadataResponse.json();

      if (status !== 200) {
        const [error] = errors;

        if (error === "User does not exist" && user) {
          const { uid, token } = user;
          const newUser = await fetch(ENDPOINTS.USER, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              uid,
              email: "",
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
      const userContent = await fetch(
        `${ENDPOINTS.USER}/${user?._id}/content`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const { data } = await userContent.json();
      const [styles, curations] = data;
      dispatch(setUserContent({ styles, curations }));
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

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

    console.log(firebaseApp);

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

  useEffect(() => {
    if (user?.id > -1 && user?.token > "") {
      getUserContent();
    }
  }, [user]);

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
