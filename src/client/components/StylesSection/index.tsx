import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ENDPOINTS } from "../../config";
import { ReduxStateConfigProps } from "../../interfaces";
import SidebarSection from "../common/SidebarSection";
import { mapFromObject, objectFromMap } from "../../lib/utils";
import useUser from "../../hooks/useUser";
import useCartoliciousStyles from "../../hooks/useCartoliciousStyles";
import { LiciousIconButton, LiciousSelect } from "@licious/react";

const EditStylesButton: React.FC = () => {
  return <LiciousIconButton disabled icon="edit" />;
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

  return <LiciousIconButton icon="save" onClick={handleSave} />;
};

const StylesSection: React.FC = () => {
  const [currentStyle, setCurrentStyle] = useState("");
  const { setCaroliciousStyles, setBackground } = useCartoliciousStyles();

  const { token, styles } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  const options = useMemo(() => {
    const options = [{ label: "Select a style", value: "none" }];

    styles.forEach(({ _id: id }, i) =>
      options.push({ value: id, label: `Style ${i}` })
    );

    return options;
  }, [styles]);

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
      setCaroliciousStyles({ styleMap, style_id: _id });
      setBackground(background || [0, 0, 0, 1]);
    } catch (e) {
    } finally {
    }
  };

  const handleStyleSelectLicious = (e: any) => {
    const value =
      e?.target?.shadowRoot?.querySelector("select").value || "none";
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
        <LiciousSelect options={options} onInput={handleStyleSelectLicious} />
      )}
    </SidebarSection>
  );
};

export default StylesSection;
