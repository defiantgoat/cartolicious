import styled from "styled-components";
import palette from "../../lib/palette";

const SidebarRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 300px;
  background-color: #222;
  height: 100%;
  borderleft: 3px solid #000;
`;

const SidebarContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: calc(100% - 4rem);
  overflow-y: scroll;
`;

const ProfileContainer = styled.div`
  display: flex;
  padding: 1rem;
  height: 2rem;
  align-items: center;
  color: ${palette.warm.secondary.hex};
  background-color: #000;
`;

const ProfilePictureContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 0.5rem;
  & img {
    height: 2rem;
    width: 2rem;
    border-radius: 1rem;
  }
`;

const LogoutButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: end;
`;

export {
  SidebarRoot,
  SidebarContentContainer,
  LogoutButtonContainer,
  ProfileContainer,
  ProfilePictureContainer,
};
