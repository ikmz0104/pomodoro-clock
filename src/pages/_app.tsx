import React from 'react';
import '../styles/globals.css';

interface Props {
  pageProps: any;
  Component: any;
}

export default class App extends React.Component<Props> {
  render(): JSX.Element {
    const { pageProps, Component } = this.props;

    return (
      <>
        <Component {...pageProps} />
      </>
    );
  }
}
