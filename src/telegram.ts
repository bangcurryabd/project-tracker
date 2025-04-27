declare global {
  interface Window {
    Telegram: {
      WebApp: any;
    };
  }
}

export const tg = window.Telegram.WebApp;

// Initialize the WebApp
tg.ready();

// Enable closing confirmation
tg.enableClosingConfirmation();

// Set the main button color to match Telegram's theme
tg.MainButton.setParams({
  text_color: '#FFFFFF',
  color: tg.themeParams.button_color || '#2481cc',
});

// Export theme information
export const theme = {
  isDark: tg.colorScheme === 'dark',
  backgroundColor: tg.backgroundColor,
  textColor: tg.themeParams.text_color,
  buttonColor: tg.themeParams.button_color,
  buttonTextColor: tg.themeParams.button_text_color,
};

// Export user information (if available)
export const user = tg.initDataUnsafe?.user || {
  id: null,
  username: null,
  firstName: 'Guest',
  lastName: null,
}; 