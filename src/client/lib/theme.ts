import { createTheme } from "@material-ui/core/styles";
import palette from "./palette";

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
