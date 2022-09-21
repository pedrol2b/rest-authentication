import React, { FC } from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
