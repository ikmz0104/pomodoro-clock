import React from 'react';
import '../styles/globals.css';
import SimpleBottomNavigation from '../views/Navigation';
import { ThemeProvider } from '@material-ui/core/styles';
import { muiTheme } from '../util/theme';

interface Props {
  pageProps: any;
  Component: any;
}

export default class App extends React.Component<Props> {
  render(): JSX.Element {
    const { pageProps, Component } = this.props;

    return (
      <ThemeProvider theme={muiTheme}>
        <Component {...pageProps} />
        <SimpleBottomNavigation />
      </ThemeProvider>
    );
  }
}
