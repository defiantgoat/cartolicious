import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ENDPOINTS } from "../../config";
import SidebarSection from "../common/SidebarSection";
import { mapFromObject, objectFromMap } from "../../lib/utils";
import useUser from "../../hooks/useUser";
import useCartoliciousStyles from "../../hooks/useCartoliciousStyles";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";
import { LiciousIconButton, LiciousSelect } from "@licious/react";

const EditStylesButton: React.FC = () => {
  return <LiciousIconButton size="sm" disabled icon="edit" />;
};

const SaveStyleButton: React.FC = () => {
  const { token, user_id } = useUser();
  const { currentStyles, currentBackground, addStyle } =
    useCartoliciousStyles();

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

      const { data, errors } = await saveStyle.json();

      if (data && data.length > 0) {
        const newStyle = data[0];
        addStyle(newStyle);
      }
    }
  };

  return <LiciousIconButton size="sm" icon="save" onClick={handleSave} />;
};

const StylesSection: React.FC = () => {
  const [currentStyle, setCurrentStyle] = useState("none");
  const { styleId } = useCartoliciousStyles();
  const { loadStyleById } = useCartoliciousApi();

  useEffect(() => {
    setCurrentStyle(styleId || "none");
  }, [styleId]);

  const { token, styles } = useSelector((state: any) => state.user);

  const options = useMemo(() => {
    const options = [{ label: "Select a style", value: "none" }];

    if (currentStyle === "none") {
      options[0]["selected"] = true;
    }

    styles.forEach(({ _id: id, name }, i) => {
      const opt = { value: id, label: name || `zStyle ${i}` };
      if (id === currentStyle) {
        opt["selected"] = true;
      }
      options.push(opt);
    });

    return options;
  }, [styles, currentStyle]);

  const loadStyle = async (_id: string) => {
    if (!_id || _id === "none") {
      return;
    }
    try {
      await loadStyleById({ _id });
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
