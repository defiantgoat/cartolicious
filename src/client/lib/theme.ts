import { withStyles, createStyles, createTheme } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import palette from "./palette";


export const CartoliciousInput = withStyles((theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.primary.main,
      borderWidth: 0,
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      // transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderColor: theme.palette.primary.main,
        // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        color: theme.palette.primary.main
      },
    },
  }),
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
