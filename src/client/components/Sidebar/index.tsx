import React from "react";
import {
  SidebarRoot,
  SidebarContentContainer,
  LogoutButtonContainer,
  ProfileContainer,
  ProfilePictureContainer,
} from "./styled-components";
import LogoutButton from "../LogoutButton";
import CurationsSection from "../CurationsSection";
import StylesSection from "../StylesSection";
import EditStyleSection from "../EditStyleSection";
import Login from "../Login";
import useUser from "../../hooks/useUser";
import AboutSection from "../AboutSection";

const Sidebar: React.FC = () => {
  const { details, logged_in } = useUser();

  return (
    <SidebarRoot>
      <SidebarContentContainer>
        {logged_in ? (
          <>
            <EditStyleSection />
            <StylesSection />
            <CurationsSection />
          </>
        ) : (
          <Login />
        )}
        <AboutSection />
      </SidebarContentContainer>

      {logged_in && (
        <ProfileContainer>
          <>
            <ProfilePictureContainer>
              <img src={details["photoURL"]} />
              <span>{details["displayName"]}</span>
            </ProfilePictureContainer>
            <LogoutButtonContainer>
              <LogoutButton />
            </LogoutButtonContainer>
          </>
        </ProfileContainer>
      )}
    </SidebarRoot>
  );
};

export default Sidebar;
