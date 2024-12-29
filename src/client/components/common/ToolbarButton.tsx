import React from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface ToolbarButtonProps {
  onClickHandler: any;
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  toolbarButton: {
    backgroundColor: "darkred",
  },
}));

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
