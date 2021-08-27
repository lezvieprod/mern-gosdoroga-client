import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools"

const styles = {
  global: (props) => ({
    "html, body": {
      color: props.colorMode === "dark" ? "#f3f3f3" : "gray.600",
    },
    // a: {
    //   color: props.colorMode === "dark" ? "teal.300" : "teal.500",
    // },
  }),
}

const config = {
  initialColorMode: "light",
  useSystemColorMode: false
};

const breakpoints = createBreakpoints({
  xs: 0,
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px'
})


export const theme = extendTheme({ styles, config, breakpoints })