import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';

import { AuthProvider } from './hooks/auth.js';

import theme from './styles/theme'

import { Routes } from './routes';

//render é inserir conteudo q no caso vem do app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* theme provider recebe theme, provider context recebe contexo */}
    <ThemeProvider theme={theme}>
      <GlobalStyles/> 
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
