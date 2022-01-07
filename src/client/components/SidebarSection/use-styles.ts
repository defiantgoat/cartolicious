import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sidebarSection: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    gap: "1rem",
    backgroundColor: "#222",
    padding: "1rem 1.5rem",
    borderBottom: "3px solid #000",
    "& h2": {
      color: "gold",
      fontFamily: "rig-shaded-bold-face, sans-serif",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: "1em",
    },
  },
}));

export default useStyles;
