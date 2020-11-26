import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { teal, blueGrey } from '@material-ui/core/colors';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: teal['A400'],
      light: teal[400],
      dark: teal['A400']
    },
    secondary: {
      main: blueGrey[200],
      light: blueGrey[900],
      dark: blueGrey[200]
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
