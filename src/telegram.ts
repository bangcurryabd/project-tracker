import { WebApp } from '@twa-dev/sdk';

// Initialize the Telegram WebApp
WebApp.ready();

// Export the WebApp instance for use throughout the app
export const tg = WebApp;

// Export user information
export const user = {
  id: tg.initDataUnsafe.user?.id,
  username: tg.initDataUnsafe.user?.username,
  firstName: tg.initDataUnsafe.user?.first_name,
  lastName: tg.initDataUnsafe.user?.last_name,
};

// Export theme information
export const theme = {
  isDark: tg.colorScheme === 'dark',
  backgroundColor: tg.backgroundColor,
  headerColor: tg.headerColor,
}; 