import React, { useContext, useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import MapContext from "../MapContext";
import { ReduxStateConfigProps } from "../../interfaces";
import { toggleCurationsDialog } from "../../actions";
import SidebarSection from "../common/SidebarSection";
import { objectFromMap } from "../../lib/utils";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";
import useCartoliciousStyles from "../../hooks/useCartoliciousStyles";
import { LiciousIconButton, LiciousSelect } from "@licious/react";

const EditCurationsButton: React.FC = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(toggleCurationsDialog());
  return (
    <LiciousIconButton
      icon="edit"
      onClick={handleClick}
      title="Edit Your Curations"
    />
  );
};

const SaveCuration: React.FC = () => {
  const map = useContext(MapContext);
  const { saveCuration } = useCartoliciousApi();

  const { currentStyles, currentBackground, setCaroliciousStyles } =
    useCartoliciousStyles();

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

  return <LiciousIconButton icon="save" onClick={handleSave} />;
};

const CurationsSection: React.FC = () => {
  const dispatch = useDispatch();
  const map = useContext(MapContext);
  const { loadCuration } = useCartoliciousApi();

  const [currentCuration, setCurrentCuration] = useState("none");

  const { token, curations } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  const options = useMemo(() => {
    const options = [{ label: "Select a curation", value: "none" }];

    curations.forEach(({ _id: id, name }, i) => {
      const smallName = name.length > 15 ? `${name.substring(0, 15)}...` : name;
      options.push({ value: id, label: smallName });
    });

    return options;
  }, [curations]);

  const handleSelectLicious = (e: any) => {
    const value =
      e?.target?.shadowRoot?.querySelector("select").value || "none";
    if (value === "none") {
      setCurrentCuration("");
      return;
    }
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
        <LiciousSelect options={options} onInput={handleSelectLicious} />
      )}
    </SidebarSection>
  );
};

export default CurationsSection;
