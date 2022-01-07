import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./use-styles";
import LoginButton from "../LoginButton";
import { ReduxStateConfigProps } from "../../interfaces";
import Menu from "@material-ui/icons/Menu";
import ToolbarButton from "../ToolbarButton";

const UserButton: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { loggedIn, details } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  return (
    <div className={classes.userButton}>
      {!loggedIn ? (
        <LoginButton />
      ) : (
        <>
          <ToolbarButton onClickHandler={() => console.log("open")}>
            <Menu />
          </ToolbarButton>
        </>
      )}
    </div>
  );
};

export default UserButton;
