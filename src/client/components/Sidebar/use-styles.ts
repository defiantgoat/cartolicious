import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    flexBasis: "18rem",
    gap: "1rem",
    backgroundColor: "#222",
    overflowY: "scroll",
    "& h2": {
      color: "gold",
      fontFamily: "rig-shaded-bold-face, sans-serif",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "1em",
      borderBottom: "1px solid #555",
    },
  },
  sidebarContent: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: "1rem",

  },
  sectionContent: {
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
  },
  profilePicture: {
    height: "2rem",
    width: "2rem",
    borderRadius: "1rem",
  },
  profileContainer: {
    display: "flex",
    flexGrow: 0,
    padding: "1rem",
    alignItems: "center",
    gap: "1rem",
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
