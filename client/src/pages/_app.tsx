import React, { FC } from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Theme from '../styles/theme'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={Theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
