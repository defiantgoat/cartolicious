import React from "react";
import { useSelector } from "react-redux";
import useStyles from "./use-styles";
import LogoutButton from "../LogoutButton";
import LoginButton from "../LoginButton";
import SidebarSection from "../SidebarSection";
import CurationsSection from "../CurationsSection";
import StylesSection from "../StylesSection";
import EditStyleSection from "../EditStyleSection";
import { ReduxStateConfigProps } from "../../interfaces";

const Sidebar: React.FC = () => {
  const classes = useStyles();
  // const busy = useSelector((state: ReduxStateConfigProps) => state.busy);
  const { details, loggedIn } = useSelector(
    (state: ReduxStateConfigProps) => state.user
  );
  const advanced = useSelector(
    (state: ReduxStateConfigProps) => state.advanced
  );

  return advanced ? (
    <div className={classes.sidebar}>
      <div className={classes.sidebarContent}>
        {!loggedIn ? (
          <LoginButton />
        ) : (
          <>
            <EditStyleSection />
            <StylesSection />
            <CurationsSection />
          </>
        )}
      </div>

      <div className={classes.profileContainer}>
        {loggedIn && (
          <>
            <div
              style={{
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              <img
                className={classes.profilePicture}
                src={details["picture"]}
              />
              <span>{details["name"]}</span>
            </div>
            <div
              style={{ display: "flex", flexGrow: 1, justifyContent: "end" }}
            >
              <LogoutButton />
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default Sidebar;
