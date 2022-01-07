import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    backgroundColor: theme.palette.common.white,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flexDirection: "column",
  },
  mainContent: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    height: "calc(100% - 65px)",
  },
  busyIndicator: {
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, .8)",
    height: "100vh",
    width: "100%",
    color: "gold",
    position: "absolute",
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "rig-shaded-bold-extrude, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "3em",
    transition: theme.transitions.create(
      ["background-color", "color", "opacity"],
      { duration: 300 }
    ),
  },
}));

export default useStyles;
