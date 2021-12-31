import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexShrink: 0,
    backgroundColor: "#000",
    borderRight: "1px solid #ccc",
    alignItems: "center",
    display: "flex",
    padding: ".75rem",
    flexDirection: "row",
    justifyContent: "space-between",
    flexBasis: "2rem"
  },
  title: {
    fontFamily: "rig-shaded-bold-extrude, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    color: "gold",
  },
  buttonContainer: {
    flexShrink: 1,
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
  },
}));

export default useStyles;
