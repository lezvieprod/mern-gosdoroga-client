import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react"

import { extendTheme } from "@chakra-ui/react"
import { BrowserRouter as Router } from 'react-router-dom'



// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bgColor: "#F3F3F3",
      },
      // a: {
      //   color: "teal.500",
      // },
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
