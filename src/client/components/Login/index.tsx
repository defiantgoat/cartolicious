import React from "react";
import { AboutContainer, LoginRoot } from "./styled-components";
import SidebarSection from "../common/SidebarSection";
import GoogleLoginButton from "./GoogleLoginButton";

const Login: React.FC = () => {
  return (
    <SidebarSection header="Sign In">
      <LoginRoot>
        <GoogleLoginButton />
        <AboutContainer>
          <h3>With a login you can:</h3>
          <ul>
            <li>Recolor the map (3 per day)</li>
            <li>Save styles and curations (3 each)</li>
          </ul>
        </AboutContainer>
      </LoginRoot>
    </SidebarSection>
  );
};

export default Login;
