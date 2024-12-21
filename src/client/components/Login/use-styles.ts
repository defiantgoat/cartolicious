import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    display: "flex",
  },
  about: {
    fontWeight: 200,
    color: theme.palette.primary.main,
    padding: "1rem 0",
    marginTop: "1rem",
    "& ul": {
      paddingTop: "1rem",
      "& li": {
        listStylePosition: "inside",
        color: theme.palette.primary.main,
        lineHeight: "1.4rem",
        fontSize: ".9rem",
      },
    },
  },
}));

export default useStyles;
