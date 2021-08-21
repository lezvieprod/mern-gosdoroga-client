import { extendTheme } from "@chakra-ui/react";

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

export const theme = extendTheme({ styles, config })