import React, { useContext, useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import MapContext from "../MapContext";
import SidebarSection from "../common/SidebarSection";
import { objectFromMap } from "../../lib/utils";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";
import useCartoliciousStyles from "../../hooks/useCartoliciousStyles";
import { LiciousIconButton, LiciousSelect } from "@licious/react";
import styled from "styled-components";
import palette from "../../lib/palette";

const AboutText = styled.div`
  color: ${palette.warm.secondary.hex};
  line-height: 1.3rem;
  font-size: 0.9rem;
`;

const AboutSection: React.FC = () => {
  return (
    <SidebarSection header="About Cartolicious">
      <AboutText>
        Cartolicious is a fun side project and a work in progress.
        <br />
        <br />
        Somethings may or may not work as expected.
      </AboutText>
    </SidebarSection>
  );
};

export default AboutSection;
