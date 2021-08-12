import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles';

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head />
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
