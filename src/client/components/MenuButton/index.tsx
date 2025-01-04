import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../actions";
import { LiciousMenuButton } from "@licious/react";
import { ReduxStateConfigProps } from "../../interfaces";

const MenuButton: React.FC = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(
    (state: ReduxStateConfigProps) => state.sidebar_open
  );

  const handleSidebarToggle = () => dispatch(toggleSidebar());

  return (
    <LiciousMenuButton opened={sidebarOpen} onClick={handleSidebarToggle} />
  );
};

export default MenuButton;
