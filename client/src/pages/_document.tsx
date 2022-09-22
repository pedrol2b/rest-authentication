import React from 'react'
import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import theme from '../styles/theme'

export default class MyDocument extends NextDocument {
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="robots" content="index, follow" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Alata&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
