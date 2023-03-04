import React, {useMemo} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";
import useQueryString from '../../hooks/useQueryString'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const params = useQueryString()

  const returnTo = useMemo(() => {
    const paramArray = Object.entries(params)
    if (paramArray.length === 0) {
      return '/'
    }

    let returnToUrl = '/?'
    paramArray.forEach(([key, value], i) => {
      returnToUrl += `${key}=${value}`
      if (i < paramArray.length - 1) {
        returnToUrl += '&'
      }
    })

    return returnToUrl

  },[params])

  const handleLogin = () => loginWithRedirect({appState: {
    returnTo
    }});

  return (
    <div style={{ padding: "1rem 1.2rem", display: "flex" }}>
      <Button
        color="primary"
        style={{ flex: 1 }}
        variant="outlined"
        onClick={handleLogin}
      >
        Log In
      </Button>
    </div>
  );
};

export default LoginButton;
