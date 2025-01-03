import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sidebarSection: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    gap: "1rem",
    backgroundColor: "#222",
    padding: "1rem 1.2rem",
    borderBottom: "3px solid #000",
    "& h2": {
      color: theme.palette.primary.main,
      fontFamily: "rig-shaded-bold-face, sans-serif",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "1em",
    },
    "& h3": {
      color: theme.palette.primary.main,
      fontFamily: "rig-shaded-bold-face, sans-serif",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: ".75em",
    },
  },
  sectionButtons: {
    display: "flex",
    gap: ".5rem",
    justifyContent: "flex-end",
  },
}));

interface SidebarSectionProps {
  header?: string;
  children?: React.ReactNode;
  buttons?: JSX.Element[];
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  header,
  children,
  buttons,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.sidebarSection}>
      {header && <h2>{header}</h2>}
      {children}
      <div className={classes.sectionButtons}>{buttons}</div>
    </div>
  );
};

export default SidebarSection;
