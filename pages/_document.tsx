// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document'

class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="favicon" sizes="180x180" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9504af" />
          <meta name="msapplication-TileColor" content="#9504af" />
          <meta name="theme-color" content="#9504af" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=optional" rel="stylesheet"/>
          <meta name="robots" content="NONE,NOARCHIVE" />
          <meta name="theme-color" content="#9504af" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
