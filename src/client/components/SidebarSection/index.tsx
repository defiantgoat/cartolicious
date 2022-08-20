import React from "react";
import useStyles from "./use-styles";

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
