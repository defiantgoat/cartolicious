import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Select,
  FormControl,
  IconButton,
  Dialog,
} from "@material-ui/core";
import EditRounded from "@material-ui/icons/EditRounded";
import MapContext from "../MapContext";
import { ENDPOINTS } from "../../config";
import { ReduxStateConfigProps } from "../../interfaces";
import {
  setCaroliciousStyles,
  setBackground,
  toggleCurationsDialog,
} from "../../actions";
import SidebarSection from "../SidebarSection";
import { mapFromObject, objectFromMap } from "../../lib/utils";
import { CartoliciousInput } from "../../lib/theme";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";
import useCartoliciousStyles from "../../hooks/useCartoliciousStyles";
import useUser from "../../hooks/useUser";

const EditCurationsButton: React.FC = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(toggleCurationsDialog());
  return (
    <IconButton
      color="primary"
      title="Edit Your Curations"
      onClick={handleClick}
    >
      <EditRounded />
    </IconButton>
  );
};

const SaveCuration: React.FC = () => {
  const map = useContext(MapContext);
  const { saveCuration } = useCartoliciousApi();

  const { currentStyles, currentBackground } = useCartoliciousStyles();

  const handleSave = async () => {
    if (currentStyles && map) {
      const styles = objectFromMap(currentStyles);
      const [long, lat] = map.getView().getCenter();
      const zoom = map.getView().getZoom();

      const { status, errors, data } = await saveCuration({
        styles,
        background: currentBackground,
        long,
        lat,
        zoom,
      });
      console.log(status, errors, data);
    }
  };

  return (
    <Button color="primary" variant="outlined" onClick={handleSave}>
      Save Curation
    </Button>
  );
};

const CurationsSection: React.FC = () => {
  const dispatch = useDispatch();
  const map = useContext(MapContext);
  const { loadCuration } = useCartoliciousApi();

  const [currentCuration, setCurrentCuration] = useState("none");

  const { token, curations } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  const createOptions = (): JSX.Element[] => {
    const options = [
      <option key="select-a-curation" value={"none"}>
        Select a Curation
      </option>,
    ] as JSX.Element[];

    curations.forEach(({ _id, name }, i) =>
      options.push(
        <option key={`curation-${i}`} value={_id}>
          {name}
        </option>
      )
    );

    return options;
  };

  const handleCurationSelect = ({ target: { value } }) => {
    setCurrentCuration(value);
  };

  useEffect(() => {
    if (currentCuration !== "none") {
      loadCuration(currentCuration);
    }
  }, [currentCuration]);

  return (
    <SidebarSection
      header="Your Curations"
      buttons={[
        <SaveCuration key="save-curations-button" />,
        <EditCurationsButton key="edit-curations-button" />,
      ]}
    >
      {curations.length > 0 && (
        <FormControl variant="outlined">
          <Select
            native
            value={currentCuration}
            onChange={handleCurationSelect}
            input={<CartoliciousInput />}
          >
            {createOptions()}
          </Select>
        </FormControl>
      )}
    </SidebarSection>
  );
};

export default CurationsSection;
