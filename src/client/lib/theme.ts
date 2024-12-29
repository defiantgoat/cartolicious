import {
  withStyles,
  createStyles,
  createTheme,
} from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import palette from "./palette";

export const CartoliciousInput = withStyles((theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
      "& .MuiSvgIcon-root": {
        color: theme.palette.primary.main,
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: "#000",
      color: theme.palette.primary.main,
      borderWidth: 0,
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      // Use the system font instead of the default Roboto font.
      "&:focus": {
        borderColor: theme.palette.primary.main,
        borderRadius: 4,
        backgroundColor: "#333",
        color: theme.palette.primary.main,
      },
    },
  })
)(InputBase);

const theme = createTheme({
  palette: {
    primary: {
      main: palette.warm.primary.hex,
      dark: palette.warm.tertiary.hex,
    },
    secondary: {
      main: palette.warm.secondary.hex,
    },
    action: {
      hover: "rgba(255,255,255,.8)",
    },
  },
});

export default theme;
