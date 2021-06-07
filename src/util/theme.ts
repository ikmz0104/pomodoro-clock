import { createMuiTheme } from '@material-ui/core/styles';

export const theme = {
  backgroundColor: '#f9fafa',
  wrapperColor: {
    settion: 'linear-gradient(90deg, rgba(78, 191, 201, 1) 0%, rgba(71, 180, 238, 1) 50%, rgba(50, 137, 245, 1) 100%)',
    break: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
  },
  button: {
    prime: '#007FFF',
    second: '#96ddeb',
  },
};

export const muiTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3B82F6',
      dark: '#1D1D1F',
    },
    secondary: {
      main: '#86868B',
    },
    text: {
      primary: '#404040',
    },
  },
  typography: {
    button: {
      borderRadius: 7,
    },
  },
});
