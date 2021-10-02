import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles';

class CustomDocument extends Document {
  url = process.env.NEXT_PUBLIC_BASE_URL; //サイトurl
  title = 'みーたんタイマー';
  description = 'みーたんのタイマー';
  image = `${this.url}/icon-256x256.png`; //サムネ画像url

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <meta name="description" content={this.description} />
          <meta name="theme-color" content="#333" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={this.title} />
          {/* PWA設定 */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png"></link>
          <meta name="theme-color" content="#F779AF" />
          <link rel="icon" sizes="192x192" href="/thumbnail.192.192.png" />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:url" content={this.url} />
          <meta property="og:description" content={this.description} />
          <meta property="og:site_name" content={this.title} />
          <meta property="og:image" content={this.image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={this.title} />
          <meta name="twitter:image" content={this.image} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;

CustomDocument.getInitialProps = async (ctx: DocumentContext) => {
  const materialUiServerStyleSheets = new MaterialUiServerStyleSheets();
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        {materialUiServerStyleSheets.getStyleElement()}
      </>
    ),
  };
};
