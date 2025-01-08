import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { AppRoot, MainContent, BusyIndicator } from "./styled-components";
import OLMap from "ol/Map";
import OLView from "ol/View";
import MapContainer from "../MapContainer";
import MapboxLayer from "../MapboxLayer";
import MapContext from "../MapContext";
import Toolbar from "../Toolbar";
import Sidebar from "../Sidebar";
import EditCurationsDialog from "../EditCurationsDialog";
import { MAP_CONFIG, ENDPOINTS } from "../../config";
import useUser from "../../hooks/useUser";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import FirebaseContext from "../Firebase/context";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";

const App: React.FC = () => {
  const sidebarOpen = useSelector((state: any) => state.root.sidebar_open);
  const busy = useSelector((state: any) => state.root.busy);
  const firebaseApp = useContext(FirebaseContext);

  const {
    token,
    user_id,
    setUser,
    logged_in,
    uid,
    setUserId,
    setUserContent,
    setAnonymousUser,
  } = useUser();

  const { getDailyCuration } = useCartoliciousApi();

  const [olMap, setOlMap] = useState(null as OLMap | null);

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
      setUserContent({ styles, curations });
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

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
        const [_id, roles] = data;
        setUserId({ _id, roles });
      }
      if (errors && errors.length) {
        console.log(errors);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (user_id && token > "") {
      getUserContent({ user_id, token });
    }
  }, [user_id, token]);

  useEffect(() => {
    if (logged_in && token && uid) {
      getUserMetadata({ uid, token });
    }
  }, [logged_in, token, uid]);

  useEffect(() => {
    const handleUserInfo = async (user: User) => {
      const accessToken = await user?.getIdToken();
      setUser({
        uid: user?.uid,
        logged_in: true,
        details: user.toJSON(),
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
          setAnonymousUser();
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
      <AppRoot>
        <EditCurationsDialog />
        <Toolbar />
        <MainContent>
          <MapContainer>
            {busy ? <BusyIndicator>Loading</BusyIndicator> : null}
            <MapboxLayer />
          </MapContainer>
          {sidebarOpen ? <Sidebar /> : null}
        </MainContent>
      </AppRoot>
    </MapContext.Provider>
  );
};

export default App;
