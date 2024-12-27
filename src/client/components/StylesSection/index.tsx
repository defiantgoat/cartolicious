import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Select, FormControl, IconButton } from "@material-ui/core";
import EditRounded from "@material-ui/icons/EditRounded";
import { ENDPOINTS } from "../../config";
import { ReduxStateConfigProps } from "../../interfaces";
import { setCaroliciousStyles, setBackground } from "../../actions";
import SidebarSection from "../SidebarSection";
import { mapFromObject, objectFromMap } from "../../lib/utils";
import { CartoliciousInput } from "../../lib/theme";
import useUser from "../../hooks/useUser";
import useCartoliciousStyles from "../../hooks/useCartoliciousStyles";

const EditStylesButton: React.FC = () => {
  return (
    <IconButton color="primary" title="Edit Your Styles">
      <EditRounded />
    </IconButton>
  );
};

const SaveStyleButton: React.FC = () => {
  const { token, user_id } = useUser();
  const { currentStyles, currentBackground } = useCartoliciousStyles();

  const handleSave = async () => {
    if (currentStyles) {
      const styles = objectFromMap(currentStyles);
      const saveStyle = await fetch(ENDPOINTS.STYLES, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user_id,
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
  const [currentStyle, setCurrentStyle] = useState("");

  const { token, styles } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  const createOptions = (): JSX.Element[] => {
    const options = [
      <option value={"none"} key="select-a-style">
        Select a Style
      </option>,
    ] as JSX.Element[];

    styles.forEach(({ _id: id }, i) =>
      options.push(
        <option key={`style-${i}`} value={id}>
          {`Style ${id}`}
        </option>
      )
    );

    return options;
  };

  const loadStyle = async (_id: string) => {
    try {
      const loadedStyle = await fetch(`${ENDPOINTS.STYLES}/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await loadedStyle.json();
      const [style] = data;
      const { background } = style;
      const styleMap = mapFromObject(style);
      dispatch(setCaroliciousStyles({ styleMap, style_id: _id }));
      dispatch(setBackground(background || [0, 0, 0, 1]));
    } catch (e) {
    } finally {
    }
  };

  const handleStyleSelect = ({ target: { value } }) => {
    if (value === "none") {
      setCurrentStyle("");
      return;
    }
    setCurrentStyle(value);
  };

  useEffect(() => {
    if (currentStyle !== "") {
      loadStyle(currentStyle);
    }
  }, [currentStyle]);

  return (
    <SidebarSection
      header="Your Styles"
      buttons={[
        <SaveStyleButton key="save-styles-button" />,
        <EditStylesButton key="edit-styles-button" />,
      ]}
    >
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
    </SidebarSection>
  );
};

export default StylesSection;
