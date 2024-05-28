import React from "react";

import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";

import { AuthProvider } from "./Context/AuthProvider";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReactDOM from "react-dom/client";

import App from "./App";

const config = {
  initialColorMode: "light",

  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />

        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
