import React from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../actions";
import Menu from "@material-ui/icons/Menu";
import ToolbarButton from "../ToolbarButton";

const MenuButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleSidebarToggle = () => dispatch(toggleSidebar());

  return (
    <ToolbarButton onClickHandler={handleSidebarToggle}>
      <Menu />
    </ToolbarButton>
  );
};

export default MenuButton;
