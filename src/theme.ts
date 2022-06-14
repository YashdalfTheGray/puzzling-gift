import { createTheme, ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#ef7373',
    },
    secondary: {
      main: '#ffab00',
    },
    background: {
      paper: '#213455',
      default: '#17263b',
    },
  },
  typography: {
    fontFamily: '"Source Sans Pro", "Roboto", "Helvetica", "Arial", sans-serif',
  },
};

export const theme = createTheme(themeOptions);
