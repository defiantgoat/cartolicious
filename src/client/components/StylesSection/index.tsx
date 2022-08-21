import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Select, FormControl } from "@material-ui/core";
import { ReduxStateConfigProps } from "../../interfaces";
import SidebarSection from "../SidebarSection";
import { CartoliciousInput } from "../../lib/theme";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";


const SaveStyleButton: React.FC = () => {
  const { saveStyle } = useCartoliciousApi();

  const handleSave = async () => {
    await saveStyle();
  };

  return (
    <Button color="primary" variant="outlined" onClick={handleSave}>
      Save Style
    </Button>
  );
};

const StylesSection: React.FC = () => {
  const [currentStyle, setCurrentStyle] = useState(-1);
  const { loadStyleById } = useCartoliciousApi();

  const { styles } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  const createOptions = (): JSX.Element[] => {
    const options = [
      <option value={-1} key='select-a-style'>Select a Style</option>,
    ] as JSX.Element[];

    styles.forEach(({ id }, i) =>
      options.push(
        <option key={`style-${i}`} value={id}>
          {`Style ${id}`}
        </option>
      )
    );

    return options;
  };

  const loadStyle = async (id: string) => {
    await loadStyleById({id});
  };

  const handleStyleSelect = ({ target: { value } }) => {
    setCurrentStyle(value);
  };

  useEffect(() => {
    if (currentStyle > -1) {
      loadStyle(`${currentStyle}`);
    }
  }, [currentStyle]);

  return (
    <SidebarSection header="Your Styles">
      {styles.length > 0 && (
        <FormControl variant="outlined">
          <Select
            native
            value={currentStyle}
            onChange={handleStyleSelect}
            input={<CartoliciousInput />}
          >
            {createOptions()}
          </Select>
        </FormControl>
      )}
      <SaveStyleButton />
    </SidebarSection>
  );
};

export default StylesSection;
