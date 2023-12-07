// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import theme from './theme/theme'
import GlobalStyles from './theme/global'

import { Routes } from './routes'
import { AuthProvider } from './contexts/authContext'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ThemeProvider theme={theme}>

      <GlobalStyles />
      <ToastContainer />
      
      <AuthProvider>
        <Routes />
      </AuthProvider>

    </ThemeProvider>
    
  </React.StrictMode>,
)
