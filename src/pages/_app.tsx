import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import SimpleBottomNavigation from 'views/Navigation';
import { muiTheme } from 'util/theme';
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from 'auth/AuthProvider';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={muiTheme}>
      <AuthProvider>
        <Component {...pageProps} />
        <SimpleBottomNavigation />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
