import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LiciousMenuButton } from "@licious/react";
import { close_sidebar, open_sidebar } from "../../reducers/rootSlice";

const MenuButton: React.FC = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state: any) => state.root.sidebar_open);

  const handleSidebarToggle = () => {
    if (sidebarOpen) {
      dispatch(close_sidebar());
      return;
    }
    dispatch(open_sidebar());
  };

  return (
    <LiciousMenuButton opened={sidebarOpen} onClick={handleSidebarToggle} />
  );
};

export default MenuButton;
