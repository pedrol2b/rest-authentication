import React, { FC } from 'react'
import Head from 'next/head'
import { useColorMode } from '@chakra-ui/react'

const Home: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Head>
        <title>Login | Inventory Management System</title>
      </Head>
      <div />
    </>
  )
}

export default Home
