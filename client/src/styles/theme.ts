import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const styles = {
  global: () => ({}),
}

const components = {
  Drawer: {
    baseStyle: () => ({}),
  },
}

export default extendTheme({
  components,
  styles,
  config,
})
