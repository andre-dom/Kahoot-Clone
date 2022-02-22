import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <ChakraProvider>
        <App/>
      </ChakraProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
);

