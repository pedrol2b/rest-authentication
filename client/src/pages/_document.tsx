import React from 'react'
import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import Theme from '../styles/themeConfig'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="robots" content="index, follow" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
