import React from "react";
import { IconButton } from "@material-ui/core";
import useStyles from "./use-styles";

interface ToolbarButtonProps {
  onClickHandler: any;
  children?: React.ReactNode;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  children,
  onClickHandler,
}) => {
  const classes = useStyles();
  return (
    <IconButton
      color="primary"
      className={classes.toolbarButton}
      onClick={onClickHandler}
    >
      {children}
    </IconButton>
  );
};

export default ToolbarButton;
