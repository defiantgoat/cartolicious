import React from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../actions";
import ToolbarButton from "../ToolbarButton";
import { SvgIcon } from "@material-ui/core";

const EngageButton: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <ToolbarButton onClickHandler={() => dispatch(toggleSidebar())}>
      <SvgIcon>
        <path d="M12,20v2c-5.5,0-10-4.5-10-10S6.5,2,12,2s8.9,3.4,9.8,8h-2.1c-.6-2.5-2.4-4.5-4.7-5.4v.4c0,1.1-.9,2-2,2h-2v2c0,.6-.4,1-1,1h-2v2h2v3h-1l-4.8-4.8c-.1.6-.2,1.2-.2,1.8,0,4.4,3.6,8,8,8Z" />
        <path d="M19.7,12.6v-.5c0-.3-.2-.5-.5-.5h-6c-.3,0-.5.2-.5.5v2c0,.3.2.5.5.5h6c.3,0,.5-.2.5-.5v-.5h.5v2h-5v5.5c0,.3.2.5.5.5h1c.3,0,.5-.2.5-.5v-4.5h4v-4h-1.5Z" />{" "}
      </SvgIcon>
    </ToolbarButton>
  );
};

export default EngageButton;
