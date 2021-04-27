// theme.js
// 1. import `extendTheme` function
import { extendTheme, ThemeConfig, Theme } from '@chakra-ui/react'
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
// 3. extend the theme
const theme: Theme = extendTheme({ config })

export default theme
