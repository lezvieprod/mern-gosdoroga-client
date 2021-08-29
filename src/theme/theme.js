import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools"
import "@fontsource/inter";
import "@fontsource/inter/700.css";
import { ContainerTheme, NavButtonTheme } from "./components.theme";


const styles = {
  global: (props) => ({
    "html, body": {
      color: "gray.600",
      bgColor: '#F5F5F5',
      minH: '100%',
      h: '100%'
    },
    "body, #root": {
      d: 'flex',
      flexDirection: 'column',
      h: '100%'
    },
    a: {
      color: "blue.500",
    },

  }),
}

const fonts = {
  heading: "Inter, sans-serf",
  body: "Inter, sans-serf",
}

const config = {
  initialColorMode: "light",
  useSystemColorMode: false
};

const components = {
  Container: ContainerTheme,
  NavButton: NavButtonTheme,
}

const breakpoints = createBreakpoints({
  xs: 0,
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1200px'
})


export const theme = extendTheme({ styles, fonts, components, config, breakpoints })