import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  userButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  profilePicture: {
    height: "2.5rem",
    width: "2.5rem",
    borderRadius: "1.75rem"
  },
  profileContainer: {
    display: "flex",
    flexGrow: 0
  }
}));

export default useStyles;
