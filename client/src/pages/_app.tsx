import React, { FC } from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { ThemeProvider as EmotionProvider } from '@emotion/react'

import theme from '../styles/theme'

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider options={theme.config} />
      <EmotionProvider theme={theme}>
        <Component {...pageProps} />
      </EmotionProvider>
    </ChakraProvider>
  )
}

export default MyApp
