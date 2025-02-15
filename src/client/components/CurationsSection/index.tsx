import React, { useContext, useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import MapContext from "../MapContext";
import SidebarSection from "../common/SidebarSection";
import { objectFromMap } from "../../lib/utils";
import useCartoliciousApi from "../../hooks/useCartoliciousApi";
import useCartoliciousStyles from "../../hooks/useCartoliciousStyles";
import { LiciousIconButton, LiciousSelect } from "@licious/react";
import { getThumbnail, rgbaToHex } from "../../lib/utils";

import {
  open_curations_dialog,
  close_curations_dialog,
} from "../../reducers/rootSlice";
import { add_curation } from "../../reducers/userSlice";

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

// const SaveCurationPanel: React.FC<{
//   open: boolean;
//   onPanelClosed?: () => void;
// }> = ({ open = false, onPanelClosed }) => {
//   const map = useContext(MapContext);
//   const { currentStyles, currentBackground } = useCartoliciousStyles();
//   const [busy, setBusy] = useState(false);
//   const [thumbnailSource, setThumbnailSource] = useState<null | string>(null);

//   useEffect(() => {
//     const thumb = async () => {
//       setBusy(true);
//       const thumbnail = await getThumbnail({
//         map,
//         exportOptions: {
//           backgroundColor: rgbaToHex(currentBackground),
//         },
//       });
//       setThumbnailSource(thumbnail);
//       setBusy(false);
//     };
//     if (open && map && currentStyles && !thumbnailSource) {
//       setTimeout(() => thumb(), 1000);
//     }
//   }, [open, map, currentStyles]);

//   const handleOnPanelClosed = () => {
//     if (onPanelClosed) {
//       onPanelClosed();
//     }
//     setThumbnailSource(null);
//   };

//   return (
//     <CartoliciousPanel
//       open={open}
//       header="Curation Details"
//       size="md"
//       onPanelClosed={handleOnPanelClosed}
//     >
//       <div>
//         {thumbnailSource ? (
//           <img src={thumbnailSource} width={150} />
//         ) : (
//           <div
//             style={{ width: 150, height: 80, backgroundColor: "gray" }}
//           ></div>
//         )}
//       </div>
//     </CartoliciousPanel>
//   );
// };

const SaveCuration: React.FC<{ disabled?: boolean }> = ({
  disabled = false,
}) => {
  const map = useContext(MapContext);
  const { saveCuration, getTileGridForView } = useCartoliciousApi();
  const dispatch = useDispatch();
  const [curationName, setCurationName] = useState("");

  const { currentStyles, currentBackground } = useCartoliciousStyles();

  const handleSave = async () => {
    if (currentStyles && map) {
      const thumbnail = await getThumbnail({
        map,
        exportOptions: {
          width: 400,
          height: 225,
        },
      });
      console.log(thumbnail);
      const tile_grid = await getTileGridForView();
      const styles = objectFromMap(currentStyles);
      const [long, lat] = map.getView().getCenter();
      const zoom = map.getView().getZoom();

      const { status, errors, data } = await saveCuration({
        styles,
        background: currentBackground,
        long,
        lat,
        zoom,
        tile_grid,
      });
      dispatch(add_curation(data[0]));
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
  const { loadCuration } = useCartoliciousApi();
  const { curationId } = useCartoliciousStyles();

  const [currentCuration, setCurrentCuration] = useState("none");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentCuration(curationId || "none");
  }, [curationId]);

  const { curations } = useSelector((state: any) => state.user);

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
  const buttons = [
    <SaveCuration key="save-curations-button" disabled={loading} />,
    <EditCurationsButton
      key="edit-curations-button"
      disabled={curations.length === 0 || loading}
    />,
  ];

  return (
    <>
      <SidebarSection header="Your Curations" buttons={buttons}>
        {curations.length > 0 && (
          <LiciousSelect options={options} onInput={handleSelectLicious} />
        )}
      </SidebarSection>
    </>
  );
};

export default CurationsSection;
