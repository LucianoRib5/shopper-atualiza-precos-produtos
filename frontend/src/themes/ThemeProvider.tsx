import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
};

const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#54B591',
        dark: '#1B7856',
        light: '#E9EAF4',
      },
      secondary: {
        main: '#1C1A38',
      },
      background: {
        default: '#FCFBFA',
        paper: '#F8FDFB',
      }
    },
  }),
);

export const AppThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = lightTheme;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
