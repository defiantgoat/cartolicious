import React from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../actions";
// import Menu from "@material-ui/icons/Menu";
import ToolbarButton from "../ToolbarButton";
import { SvgIcon } from "@material-ui/core";

const MenuButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleSidebarToggle = () => dispatch(toggleSidebar());

  return (
    <ToolbarButton onClickHandler={handleSidebarToggle}>
      <SvgIcon>
        <path d="M3.9,13.1h16.1l.9-1.1-1-1.1H4l-1,1.1.9,1.1Z" />
        <path d="M5.8,8.6h14.2l.9-1.1-1-1.1H4l-1,1.1.9,1.1h1.9Z" />
        <path d="M20,15.4H4l-1,1.1.9,1.1h16.1l.9-1.1-1-1.1Z" />
      </SvgIcon>
    </ToolbarButton>
  );
};

export default MenuButton;
