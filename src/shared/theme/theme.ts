'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1CB068', // Testbook Green
      light: '#4ADE80',
      dark: '#166534',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00A3FF', // Testbook Blue/Teal
      light: '#7DD3FC',
      dark: '#0369A1',
      contrastText: '#fff',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#475569',
    },
    success: {
      main: '#10B981',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(28, 176, 104, 0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1CB068 0%, #166534 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
          border: '1px solid #E2E8F0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
