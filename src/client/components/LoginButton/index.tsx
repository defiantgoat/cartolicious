import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => loginWithRedirect();

  return (
    <div style={{padding: "1rem 1.2rem", display: "flex"}}>

    <Button color="primary" style={{flex: 1}} variant="outlined" onClick={handleLogin}>
      Log In
    </Button>
    </div>
  );
};

export default LoginButton;
