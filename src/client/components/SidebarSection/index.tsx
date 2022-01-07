import React from "react";
import useStyles from "./use-styles";

interface SidebarSectionProps {
  header?: string;
  children?: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({header, children}) => {
  const classes = useStyles();

  return (
    <div className={classes.sidebarSection}>
      {header && <h2>{header}</h2>}
      {children}
    </div>
  );
};

export default SidebarSection;
