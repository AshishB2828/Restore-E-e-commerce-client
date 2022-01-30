import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import Catalog from './components/Catalog';
import Header from './components/Header';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import HomePage from './Pages/HomePage';
import ProductDetails from './Pages/ProductDetails';

const App = () => {

  const theme = createTheme({
    palette:{
      mode: 'dark'
    }
  })

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline/>
      <Header />
      <Container>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/catalog' component={Catalog} />
        <Route path='/catalog/:id' component={ProductDetails} />
        <Route path='/about' component={AboutPage} />
        <Route path='/contact' component={ContactPage} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
