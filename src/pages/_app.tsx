import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import SimpleBottomNavigation from 'views/Navigation';
import { muiTheme } from 'util/theme';
import 'styles/globals.css';

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
      </ThemeProvider>
    );
  }
}
