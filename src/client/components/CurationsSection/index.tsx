import React, { useContext, useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import MapContext from "../MapContext";
import SidebarSection from "../common/SidebarSection";
import { objectFromMap } from "../../lib/utils";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";
import useCartoliciousStyles from "../../hooks/useCartoliciousStyles";
import {
  LiciousButton,
  LiciousIconButton,
  LiciousSelect,
} from "@licious/react";
// import { getThumbnail } from "../../lib/utils";

import {
  open_curations_dialog,
  close_curations_dialog,
} from "../../reducers/rootSlice";
import { Map } from "ol";
import VectorTileLayer from "ol/layer/VectorTile";

const EditCurationsButton: React.FC<{
  disabled?: boolean;
}> = ({ disabled }) => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state: any) => state.root.curations_dialog_open
  );
  const handleClick = () => {
    if (dialogOpen) {
      dispatch(close_curations_dialog());
      return;
    }
    dispatch(open_curations_dialog());
  };
  return (
    <LiciousIconButton
      disabled={disabled}
      size="sm"
      icon="edit"
      onClick={handleClick}
      title="Edit Your Curations"
    />
  );
};

const SaveCuration: React.FC<{ disabled?: boolean }> = ({
  disabled = false,
}) => {
  const map = useContext(MapContext);
  const { saveCuration } = useCartoliciousApi();

  const { currentStyles, currentBackground } = useCartoliciousStyles();

  const handleSave = async () => {
    if (currentStyles && map) {
      // const thumbnail = await getThumbnail({
      //   map,
      //   exportOptions: {
      //     width: 400,
      //     height: 225,
      //   },
      // });
      // console.log(thumbnail);
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
    <LiciousIconButton
      size="sm"
      icon="save"
      onClick={handleSave}
      disabled={disabled}
    />
  );
};

const CurationsSection: React.FC = () => {
  const dispatch = useDispatch();
  const map = useContext(MapContext) as Map;
  const { loadCuration } = useCartoliciousApi();
  const { curationId } = useCartoliciousStyles();

  const [currentCuration, setCurrentCuration] = useState("none");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentCuration(curationId || "none");
  }, [curationId]);

  const { token, curations } = useSelector((state: any) => state.user);

  const options = useMemo(() => {
    const options = [{ label: "Select a curation", value: "none" }];

    if (currentCuration === "none") {
      options[0]["selected"] = true;
    }

    curations.forEach(({ _id: id, name }, i: number) => {
      const smallName = name.length > 15 ? `${name.substring(0, 15)}...` : name;
      const opt = { value: id, label: smallName };
      if (id === currentCuration) {
        opt["selected"] = true;
      }
      options.push(opt);
    });

    return options;
  }, [curations, currentCuration]);

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
    const load = async () => {
      setLoading(true);
      await loadCuration(currentCuration);
      setLoading(false);
    };
    if (currentCuration !== "none") {
      load();
    }
  }, [currentCuration]);

  const testTileGrid = () => {
    if (map) {
      const [vectorLayer] = map.getLayers().getArray() as VectorTileLayer[];
      const view = map.getView();
      const size = map.getSize();
      const exent = view.calculateExtent(size);
      const zoom = view.getZoom() || 0;
      vectorLayer?.getSource()?.tileGrid?.forEachTileCoord(exent, zoom, (a) => {
        //The order is z (zoom level), x (column), and y (row).
        //   [
        //     12,
        //     1501,
        //     2228
        // ]
        console.log(a);
      });
    }
  };

  return (
    <SidebarSection
      header="Your Curations"
      buttons={[
        <SaveCuration key="save-curations-button" disabled={loading} />,
        <EditCurationsButton
          key="edit-curations-button"
          disabled={curations.length === 0 || loading}
        />,
      ]}
    >
      {curations.length > 0 && (
        <LiciousSelect options={options} onInput={handleSelectLicious} />
      )}
      <LiciousButton label="Test Tile Grid" onClick={testTileGrid} />
    </SidebarSection>
  );
};

export default CurationsSection;
