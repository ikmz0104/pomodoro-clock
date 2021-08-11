import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import SimpleBottomNavigation from 'views/Navigation';
import { muiTheme } from 'util/theme';
import { auth } from '../../lib/db';
import { useRouter } from 'next/router';
import 'styles/globals.css';
import AuthContext from 'auth/AuthProvider';

interface Props {
  pageProps: any;
  Component: any;
}

const App: React.FC<Props> = ({ pageProps, Component }) => {
  const [currentUser, setCurrentUser] = useState<null | object>(null);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrentUser(user) : router.push('/login');
    });
  }, []);

  return (
    <ThemeProvider theme={muiTheme}>
      <AuthContext.Provider value={currentUser}>
        <Component {...pageProps} />
        <SimpleBottomNavigation />
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
