import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./use-styles";
import MapContainer from "../MapContainer";
import MapboxLayer from "../MapboxLayer";
import { ENDPOINTS } from "../../config";
import { ReduxStateConfigProps } from "../../interfaces";
import {
  setUser,
  setToken,
  setUserId,
  setUserContent,
  setCaroliciousStyles,
  setBackground,
} from "../../actions";
import { useAuth0 } from "@auth0/auth0-react";

const App: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const busy = useSelector((state: ReduxStateConfigProps) => state.busy);
  const { id, token } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const getUserMetadata = async () => {
    const domain = "api.cartolicious.com/";

    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}`,
        scope: "get:styles",
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
      const userContent = await fetch(
        `${ENDPOINTS.USER}/${id}/content`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  return (
    <div className={classes.app}>
      {/* <Toolbar /> */}
      <MapContainer>
        {busy && <div className={classes.busyIndicator}>Loading</div>}
        <MapboxLayer />
      </MapContainer>
    </div>
  );
};

export default App;
