import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./use-styles";
import Toolbar from "../Toolbar";
import MapContainer from "../MapContainer";
import MapboxLayer from "../MapboxLayer";
import { ReduxStateConfigProps } from "../../interfaces";
import { setUser, setToken } from "../../actions";
import { useAuth0 } from "@auth0/auth0-react";


const App: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const busy = useSelector((state: ReduxStateConfigProps) => state.busy);

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const getUserMetadata = async () => {
    const domain = "api.cartolicious.com/";

    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}`,
        scope: "get:styles",
      });

      dispatch(setToken(accessToken));

      // const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

      // const metadataResponse = await fetch(userDetailsByIdUrl, {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });

      // const { user_metadata } = await metadataResponse.json();

      // console.log(user_metadata)

      // setUserMetadata(user_metadata);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    dispatch(setUser({
      loggedIn: isAuthenticated,
      token: "",
      details: user
    }));

    if (user && isAuthenticated) {
      getUserMetadata()
    }
  }, [user, isAuthenticated]);

  return (
    <div className={classes.app}>
      <Toolbar />
      <MapContainer>
        {busy && <div className={classes.busyIndicator}>Loading</div>}
        <MapboxLayer />
      </MapContainer>
    </div>
  );
};

export default App;
