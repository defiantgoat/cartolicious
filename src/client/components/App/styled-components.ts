import palette from "../../lib/palette";
import styled from "styled-components";

const AppRoot = styled.div`
  display: flex;
  background-color: ${palette.warm.white.hex};
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: calc(100% - 65px);
`;

const BusyIndicator = styled.div`
  z-indx: 100;
  background-color: rgba(0, 0, 0, 0.8);
  height: 100vh;
  width: 100%;
  color: gold;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: rig-shaded-bold-extrude, sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 3em;
  flex-direction: column;
  & span:nth-child(2) {
    font-size: 1rem;
    font-family: rig-shaded-bold-face, sans-serif;
  }
`;

export { AppRoot, MainContent, BusyIndicator };
