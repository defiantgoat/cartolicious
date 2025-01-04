import styled from "styled-components";
import palette from "../../lib/palette";

const MapContainerRoot = styled.div<{ $backgroundColor?: string }>`
  flex-grow: 1;
  background-color: ${(props) =>
    props.$backgroundColor || palette.warm.white.hex};
  position: relative;
`;

export { MapContainerRoot };
