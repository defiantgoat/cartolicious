import React, { useEffect, useLayoutEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppRoot,
  MainContent,
  BusyIndicator,
  ThubmnailButtonContainer,
} from "./styled-components";
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
import { set_map_selections } from "../../reducers/rootSlice";
import { LiciousIconButton } from "@licious/react";
import palette from "../../lib/palette";
import SaveCurationImagePanel from "../common/SaveCurationImagePanel";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state: any) => state.root.sidebar_open);
  const busy = useSelector((state: any) => state.root.busy);
  const firebaseApp = useContext(FirebaseContext);

  const {
    token,
    user_id,
    logged_in,
    uid,
    setUser,
    setUserId,
    setUserContent,
    setAnonymousUser,
    userIsOwner,
  } = useUser();

  const [olMap, setOlMap] = useState(null as OLMap | null);
  const [saveCurationImagePanelOpen, setSaveCurationImagePanelOpen] =
    useState(false);

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

    map.on(["click"], function (event) {
      // @ts-ignore
      const vals = map.getFeaturesAtPixel(event.pixel, { hitTolerance: 8 });
      dispatch(set_map_selections(vals));
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
            {userIsOwner ? (
              <ThubmnailButtonContainer>
                <LiciousIconButton
                  icon="custom"
                  onClick={() => setSaveCurationImagePanelOpen(true)}
                >
                  <svg
                    /*
                    // @ts-ignore */
                    slot="custom-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                  >
                    <path
                      d="M480-480ZM120-120v-720h400v80H200v560h560v-320h80v400H120Zm120-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"
                      fill={palette.warm.primary.hex}
                    />
                  </svg>
                </LiciousIconButton>
              </ThubmnailButtonContainer>
            ) : null}
            {busy ? (
              <BusyIndicator>
                <span>Loading</span>
                <span>
                  We use free services, so sometimes it takes a while.
                </span>
              </BusyIndicator>
            ) : null}
            <MapboxLayer />
          </MapContainer>
          {sidebarOpen ? <Sidebar /> : null}
        </MainContent>
      </AppRoot>
      <SaveCurationImagePanel
        open={saveCurationImagePanelOpen}
        onPanelClosed={() => setSaveCurationImagePanelOpen(false)}
      />
    </MapContext.Provider>
  );
};

export default App;
