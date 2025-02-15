import React, { useContext, useEffect, useState } from "react";
import CartoliciousPanel from "./CartoliciousPanel";
import MapContext from "../MapContext";
import useCartoliciousStyles from "../../hooks/useCartoliciousStyles";
import { getThumbnail, rgbaToHex } from "../../lib/utils";

const SaveCurationImagePanel: React.FC<{
  open: boolean;
  onPanelClosed?: () => void;
}> = ({ open = false, onPanelClosed }) => {
  const map = useContext(MapContext);
  const { currentStyles, currentBackground } = useCartoliciousStyles();
  const [busy, setBusy] = useState(false);
  const [thumbnailSource, setThumbnailSource] = useState<null | string>(null);

  useEffect(() => {
    const thumb = async () => {
      setBusy(true);
      const thumbnail = await getThumbnail({
        map,
        exportOptions: {
          backgroundColor: rgbaToHex(currentBackground),
        },
      });
      setThumbnailSource(thumbnail);
      setBusy(false);
    };
    if (open && map && currentStyles && !thumbnailSource) {
      setTimeout(() => thumb(), 500);
    }
  }, [open, map, currentStyles]);

  const handleOnPanelClosed = () => {
    if (onPanelClosed) {
      onPanelClosed();
    }
    setThumbnailSource(null);
  };

  return (
    <CartoliciousPanel
      open={open}
      header="Curation Details"
      size="md"
      onPanelClosed={handleOnPanelClosed}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {thumbnailSource ? (
          <img src={thumbnailSource} width={"70%"} />
        ) : (
          <div
            style={{ width: "70%", height: "100%", backgroundColor: "gray" }}
          >
            Creating Thumbnail
          </div>
        )}
      </div>
    </CartoliciousPanel>
  );
};

export default SaveCurationImagePanel;
