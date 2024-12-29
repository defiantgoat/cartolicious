import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "300px",
    backgroundColor: "#222",
    height: "100%",
    borderLeft: "3px solid #000",
  },
  sidebarContent: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "calc(100% - 4rem)",
    overflowY: "scroll",
  },
  sectionContent: {
    display: "flex",
    flexDirection: "column",
  },
  profilePicture: {
    height: "2rem",
    width: "2rem",
    borderRadius: "1rem",
  },
  profileContainer: {
    display: "flex",
    padding: "1rem",
    height: "2rem",
    alignItems: "center",
    color: theme.palette.secondary.main,
    backgroundColor: "#000",
  },
}));

export default useStyles;
