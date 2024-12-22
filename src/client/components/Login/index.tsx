import React from "react";
import useStyles from "./use-styles";
import SidebarSection from "../SidebarSection";
import GoogleLoginButton from "./GoogleLoginButton";

const Login: React.FC = () => {
  const classes = useStyles();

  return (
    <SidebarSection header="Sign In">
      <div className={classes.root}>
        <GoogleLoginButton />
        <div className={classes.about}>
          <h3>With a login you can:</h3>
          <ul>
            <li>Recolor the map</li>
            <li>Save styles and curations</li>
            <li>Share curations with others</li>
          </ul>
        </div>
      </div>
    </SidebarSection>
  );
};

export default Login;
