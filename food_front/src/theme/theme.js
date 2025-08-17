import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7FB069', // Verde principal del diseño
      light: '#A8D49A',
      dark: '#5C8A4A',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2F4F2F',
      light: '#8FBC8F',
      dark: '#1F3F1F',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8FDF6',
      paper: '#ffffff',
    },
    surface: {
      main: '#E8F5E8',
      light: '#F0FBF0',
      dark: '#D0E8D0',
    },
    text: {
      primary: '#2F4F2F',
      secondary: '#7A8471',
    },
    divider: '#E8F5E8',
    action: {
      hover: 'rgba(127, 176, 105, 0.08)',
      selected: 'rgba(127, 176, 105, 0.12)',
    },
    grey: {
      50: '#F8FDF6',
      100: '#F0FBF0',
      200: '#E8F5E8',
      300: '#D0E8D0',
      400: '#A8D49A',
      500: '#7FB069',
      600: '#5C8A4A',
      700: '#2F4F2F',
    },
    success: {
      main: '#7FB069',
      light: '#A8D49A',
      dark: '#5C8A4A',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
      letterSpacing: '-0.04em',
      lineHeight: 1.1,
      color: '#2F4F2F',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      color: '#2F4F2F',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#2F4F2F',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#2F4F2F',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#7A8471',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.4,
      color: '#7A8471',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.33,
      color: '#7A8471',
    },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8, // 8px base unit
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F8FDF6',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '12px 32px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(127, 176, 105, 0.3)',
          },
        },
        contained: {
          backgroundColor: '#7FB069',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#5C8A4A',
          },
        },
        outlined: {
          borderColor: '#7FB069',
          color: '#7FB069',
          '&:hover': {
            backgroundColor: 'rgba(127, 176, 105, 0.08)',
            borderColor: '#5C8A4A',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '50%',
          padding: '12px',
          color: '#7A8471',
          '&:hover': {
            backgroundColor: 'rgba(127, 176, 105, 0.08)',
            color: '#2F4F2F',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          borderRadius: 20,
          border: 'none',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          color: '#2F4F2F',
          boxShadow: 'none',
          borderBottom: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 25,
            backgroundColor: '#ffffff',
            '& fieldset': {
              borderColor: '#E8F5E8',
            },
            '&:hover fieldset': {
              borderColor: '#7FB069',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7FB069',
              borderWidth: '2px',
            },
          },
          '& .MuiInputBase-input': {
            padding: '14px 20px',
            fontSize: '1rem',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          height: 36,
          fontSize: '0.875rem',
          fontWeight: 500,
        },
        filled: {
          backgroundColor: '#E8F5E8',
          color: '#2F4F2F',
          '&:hover': {
            backgroundColor: '#D0E8D0',
          },
        },
      },
    },
  },
});

export default theme;