import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
    position: "relative",
  },
}));

export default useStyles;
