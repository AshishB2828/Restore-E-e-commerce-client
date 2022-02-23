import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import Catalog from './components/Catalog';
import Header from './components/Header';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import HomePage from './Pages/HomePage';
import ProductDetails from './Pages/ProductDetails';
import 'react-toastify/dist/ReactToastify.css';
import BasketPage from './Pages/BasketPage';
import { getCookie } from './utils/utils';
import agent from './api/agent';
import CheckOutPage from './Pages/CheckOutPage';
import { useDispatch } from 'react-redux';
import { setBasket } from './store/slices/basketSlice';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
    const buyerId = getCookie('buyerId');
    if(buyerId){
      agent.Basket.get()
      .then(basket => dispatch(setBasket(basket)))
      .catch(err => console.log(err))
      .finally(()=>setLoading(false))
    }else{
      setLoading(false)
    }
  },[dispatch])

  const theme = createTheme({
    palette:{
      mode: 'dark'
    }
  })
  if(loading) return "Initializing App...."
  return (
    <ThemeProvider theme={theme} >
      <ToastContainer position='bottom-right' />
      <CssBaseline/>
      <Header />
      <Container>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/catalog' component={Catalog} />
        <Route path='/catalog/:id' component={ProductDetails} />
        <Route path='/about' component={AboutPage} />
        <Route path='/contact' component={ContactPage} />
        <Route path='/basket' component={BasketPage}/>
        <Route path='/checkout' component={CheckOutPage}/>
      </Container>
    </ThemeProvider>
  );
};

export default App;
