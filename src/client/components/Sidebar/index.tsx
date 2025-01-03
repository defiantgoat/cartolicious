import React from "react";
import useStyles from "./use-styles";
import LogoutButton from "../LogoutButton";
import CurationsSection from "../CurationsSection";
import StylesSection from "../StylesSection";
import EditStyleSection from "../EditStyleSection";
import Login from "../Login";
import useUser from "../../hooks/useUser";

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const { details, logged_in } = useUser();

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarContent}>
        {logged_in ? (
          <>
            <EditStyleSection />
            <StylesSection />
            <CurationsSection />
          </>
        ) : (
          <Login />
        )}
      </div>

      {logged_in && (
        <div className={classes.profileContainer}>
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
                src={details["photoURL"]}
              />
              <span>{details["displayName"]}</span>
            </div>
            <div
              style={{ display: "flex", flexGrow: 1, justifyContent: "end" }}
            >
              <LogoutButton />
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
