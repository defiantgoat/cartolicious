import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sidebarSection: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    gap: "1rem",
    backgroundColor: "#222",
    padding: "1rem 1.5rem",
    "& h2": {
      color: "gold",
      fontFamily: "rig-shaded-bold-face, sans-serif",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "1em",
      borderBottom: "1px solid #555",
    },
  },
}));

export default useStyles;
