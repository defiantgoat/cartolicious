import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Select, FormControl, IconButton } from "@material-ui/core";
import EditRounded from "@material-ui/icons/EditRounded";
import { ENDPOINTS } from "../../config";
import { ReduxStateConfigProps } from "../../interfaces";
import { setCaroliciousStyles, setBackground } from "../../actions";
import SidebarSection from "../common/SidebarSection";
import { mapFromObject, objectFromMap } from "../../lib/utils";
import { CartoliciousInput } from "../../lib/theme";

const RecolorSection: React.FC = () => {
  return (
    <SidebarSection header="Recolor!">
      <div>recolor</div>
    </SidebarSection>
  );
};

export default RecolorSection;
