import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './Context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <Routes>
            <Route path='/*' element = {<App/>}/>
          </Routes>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

