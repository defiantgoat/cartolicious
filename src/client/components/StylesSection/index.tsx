import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Select } from "@material-ui/core";
import { ENDPOINTS } from "../../config";
import { ReduxStateConfigProps } from "../../interfaces";
import { setCaroliciousStyles, setBackground } from "../../actions";
import SidebarSection from "../SidebarSection";
import { mapFromObject, objectFromMap } from "../../lib/utils";

const SaveStyleButton: React.FC = () => {
  const { token, id } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );
  const currentStyles = useSelector(
    (state: ReduxStateConfigProps) => state.cartolicious_styles
  );
  const currentBackground = useSelector(
    (state: ReduxStateConfigProps) => state.background
  );

  const handleSave = async () => {
    if (currentStyles) {
      const styles = objectFromMap(currentStyles);
      console.log(styles);
      const saveStyle = await fetch(ENDPOINTS.STYLES, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user_id: id,
          styles: {
            ...styles,
            background: currentBackground,
          },
        }),
      });

      const { status, data, errors } = await saveStyle.json();

      console.log(status, data, errors);
    }
  };

  return (
    <Button color="primary" variant="outlined" onClick={handleSave}>
      Save Style
    </Button>
  );
};

const StylesSection: React.FC = () => {
  const dispatch = useDispatch();
  const [currentStyle, setCurrentStyle] = useState(-1);

  const { token, styles } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  const createOptions = (): JSX.Element[] => {
    const options = [
      <option value={-1}>Select a Style</option>,
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
    try {
      const loadedStyle = await fetch(`${ENDPOINTS.STYLES}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await loadedStyle.json();
      const [style] = data;
      const { background } = style;
      const styleMap = mapFromObject(style);
      dispatch(setCaroliciousStyles(styleMap));
      dispatch(setBackground(background || [0, 0, 0, 1]));
    } catch (e) {
    } finally {
    }
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
      <SaveStyleButton />
      <Select native value={currentStyle} onChange={handleStyleSelect}>
        {createOptions()}
      </Select>
    </SidebarSection>
  );
};

export default StylesSection;
