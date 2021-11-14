import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexShrink: 0,
    backgroundColor: "#000",
    borderRight: "1px solid #ccc",
    alignItems: "center",
    display: "flex",
    padding: ".75rem",
  },
  title: {
    fontFamily: "rig-shaded-bold-extrude, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    color: "gold",
  },
}));

export default useStyles;
