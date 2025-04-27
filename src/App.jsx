import React, { useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const tg = window.Telegram.WebApp;

// Initialize the WebApp
tg.ready();

// Create a theme that matches Telegram's appearance
const theme = createTheme({
  palette: {
    mode: tg.colorScheme === 'dark' ? 'dark' : 'light',
    primary: {
      main: tg.themeParams?.button_color || '#2481cc',
    },
    background: {
      default: tg.backgroundColor || '#ffffff',
      paper: tg.backgroundColor || '#ffffff',
    },
    text: {
      primary: tg.themeParams?.text_color || '#000000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function App() {
  useEffect(() => {
    tg.expand();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Project Tracker</h1>
        <p>Welcome to Project Tracker! Your projects will appear here.</p>
      </div>
    </ThemeProvider>
  );
}

export default App; 