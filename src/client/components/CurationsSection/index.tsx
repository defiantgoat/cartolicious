import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MapContext from "../MapContext";
import { ENDPOINTS } from "../../config";
import { ReduxStateConfigProps } from "../../interfaces";
import { setCaroliciousStyles, setBackground } from "../../actions";
import SidebarSection from "../SidebarSection";
import { mapFromObject, objectFromMap } from "../../lib/utils";

const SaveCuration: React.FC = () => {
  const map = useContext(MapContext);

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
    if (currentStyles && map) {
      const styles = objectFromMap(currentStyles);
      const [long, lat] = map.getView().getCenter();
      const zoom = map.getView().getZoom();
      const saveCuration = await fetch(ENDPOINTS.CURATIONS, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user_id: id,
          style_id: null,
          lat,
          long,
          zoom,
          name: null,
          shared: true,
          styles: {
            ...styles,
            background: currentBackground,
          },
        }),
      });

      const { status, data, errors } = await saveCuration.json();

      console.log(status, data, errors);
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
  const { token, curations } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  const loadCuration = async (id: string) => {
    try {
      const loadedStyle = await fetch(`${ENDPOINTS.CURATIONS}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await loadedStyle.json();
      console.log(data);
      const [curation] = data;
      const {
        lat,
        long,
        style: { json },
        zoom,
      } = curation;
      const { background } = json;
      const styleMap = mapFromObject(json);
      map?.getView().setCenter([long, lat]);
      map?.getView().setZoom(zoom);
      dispatch(setCaroliciousStyles(styleMap));
      dispatch(setBackground(background || [0, 0, 0, 1]));
    } catch (e) {
    } finally {
    }
  };

  return (
    <SidebarSection header="Your Curations">
      <SaveCuration />
      {curations.map(({ id }, i) => (
        <button key={`curation-${i}`} onClick={() => loadCuration(id)}>
          {`C-${id}`}
        </button>
      ))}
    </SidebarSection>
  );
};

export default CurationsSection;
