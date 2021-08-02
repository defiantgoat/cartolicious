import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: palette.warm.primary.hex,
    },
    secondary: {
      main: palette.warm.secondary.hex
    }
  },
});

export default theme;