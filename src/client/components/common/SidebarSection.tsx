import React, { JSX } from "react";
import palette from "../../lib/palette";
import styled from "styled-components";

const SidebarSectionRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 1rem;
  background-color: #222;
  padding: 1rem 1.2rem;
  border-bottom: 3px solid #000;
  & h2 {
    color: ${palette.warm.primary.hex};
    font-family: rig-shaded-bold-face, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 1em;
  }
  & h3 {
    color: ${palette.warm.primary.hex};
    font-family: rig-shaded-bold-face, sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 0.75em;
  }
`;

const SectionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

interface SidebarSectionProps {
  header?: string;
  children?: React.ReactNode;
  buttons?: JSX.Element[];
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  header,
  children,
  buttons,
}) => {
  return (
    <SidebarSectionRoot>
      {header && <h2>{header}</h2>}
      {children}
      <SectionButtons>{buttons}</SectionButtons>
    </SidebarSectionRoot>
  );
};

export default SidebarSection;
