import React, { useRef, useEffect, JSX } from "react";
import { LiciousPanel } from "@licious/react";

type TCartoliciousPanel = {
  open: boolean;
  header: string;
  size?: "sm" | "md" | "lg";
  children?: JSX.Element | JSX.Element[];
  onPanelClosed: (e: any) => void;
};

const CartoliciousPanel: React.FC<TCartoliciousPanel> = ({
  open = false,
  header = "Header",
  size = "md",
  children,
  onPanelClosed,
}) => {
  const panelRef = useRef<any>(null);

  useEffect(() => {
    if (panelRef.current && onPanelClosed) {
      panelRef?.current?.addEventListener("panelClosed", (e: any) =>
        onPanelClosed(e)
      );
      return panelRef?.current?.removeEventListener("panelClosed", (e: any) =>
        onPanelClosed(e)
      );
    }
  }, [panelRef.current, onPanelClosed]);

  return (
    <LiciousPanel ref={panelRef} open={open} size={size} header={header}>
      <div slot="content">{children}</div>
    </LiciousPanel>
  );
};

export default CartoliciousPanel;
