import palette from "../../lib/palette";
import styled from "styled-components";

const ToolbarRoot = styled.div`
  flex-shrink: 0;
  background-color: #000;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-basis: 65px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 0 0.55rem;
  align-items: center;
`;

const Title = styled.h2`
  font-family: rig-shaded-bold-extrude, sans-serif;
  font-weight: 700;
  font-style: normal;
  color: ${palette.warm.primary.hex};
`;

const ButtonsContainer = styled.div`
  flex-shrink: 1;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const ButtonContainer = styled.div<{ $backgroundColor?: string }>`
  display: flex;
  flex-grow: 1;
  padding: 0;
  align-items: center;
  background-color: ${(props) => props.$backgroundColor || "transparent"};
`;

export {
  ButtonContainer,
  ButtonsContainer,
  ToolbarRoot,
  Title,
  TitleContainer,
};
