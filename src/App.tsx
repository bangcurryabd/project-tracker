import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { tg, theme as tgTheme } from './telegram';
import ProjectList from './components/ProjectList';
import './App.css';

// Create a theme that matches Telegram's appearance
const theme = createTheme({
  palette: {
    mode: tgTheme.isDark ? 'dark' : 'light',
    background: {
      default: tgTheme.backgroundColor,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <h1>Project Tracker</h1>
        </header>
        <main>
          <ProjectList />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App; 