import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Select, FormControl } from "@material-ui/core";
import { ReduxStateConfigProps } from "../../interfaces";
import SidebarSection from "../SidebarSection";
import { CartoliciousInput } from "../../lib/theme";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";

const SaveCuration: React.FC = () => {
  const { saveCuration } = useCartoliciousApi();

  const handleSave = async () => {
    const response = await saveCuration();
    console.log(response);
  };

  return (
    <Button color="primary" variant="outlined" onClick={handleSave}>
      Save Curation
    </Button>
  );
};

const CurationsSection: React.FC = () => {
  const { loadCuration } = useCartoliciousApi();

  const [currentCuration, setCurrentCuration] = useState(-1);

  const { curations } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  const createOptions = (): JSX.Element[] => {
    const options = [
      <option value={-1} key="select-a-curation">Select a Curation</option>,
    ] as JSX.Element[];

    curations.forEach(({ id, name }, i) =>
      options.push(
        <option key={`curation-${i}`} value={id}>
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
    if (currentCuration > -1) {
      loadCuration(`${currentCuration}`);
    }
  }, [currentCuration]);

  return (
    <SidebarSection header="Your Curations">
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
      <SaveCuration />
    </SidebarSection>
  );
};

export default CurationsSection;
