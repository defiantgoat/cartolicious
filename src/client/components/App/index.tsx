import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import useStyles from "./use-styles";
import Toolbar from "../Toolbar";
import MapContainer from "../MapContainer";
import MapboxLayer from "../MapboxLayer";
import { ReduxStateConfigProps } from "../../interfaces";
import { useAuth0 } from "@auth0/auth0-react";


const App: React.FC = () => {
  const classes = useStyles();
  const busy = useSelector((state: ReduxStateConfigProps) => state.busy);

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    console.log(user, isAuthenticated)
  }, [user, isAuthenticated]);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "api.cartolicious.com/";
  
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}`,
          scope: "get:styles",
        });

        console.log(accessToken);
  
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
  
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

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
