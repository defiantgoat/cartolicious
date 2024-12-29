import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexShrink: 0,
    backgroundColor: "#000",
    // alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexBasis: "65px",
  },
  titleContainer: {
    display: "flex",
    flexGrow: 1,
    padding: "0 .55rem",
    alignItems: "center",
  },
  title: {
    fontFamily: "rig-shaded-bold-extrude, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    color: "gold",
  },
  buttonsContainer: {
    flexShrink: 1,
    display: "flex",
    flexDirection: "row",
    gap: ".5rem",
  },
  buttonContainer: {
    display: "flex",
    flexGrow: 1,
    padding: 0,
    alignItems: "center",
  },
}));

export default useStyles;
