import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./use-styles";
import LoginButton from "../LoginButton";
import { ReduxStateConfigProps } from "../../interfaces";


const UserButton: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { loggedIn, details } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );

  return (
    <div className={classes.userButton}>
      {
        !loggedIn
        ? <LoginButton />
        : <>
            <div className={classes.profileContainer}><img className={classes.profilePicture} src={details["picture"]} /></div>
          </>
      }
      

    </div>
  );
};

export default UserButton;
