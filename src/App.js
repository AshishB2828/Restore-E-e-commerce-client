import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
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
import { fecthBasketAsync, setBasket } from './store/slices/basketSlice';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { fetchCurrentUser } from './store/slices/accountSlice';
import PrivateRoute from './private-routes/PrivateRoutes';
import Order from './Pages/Order';
import CheckoutWrapper from './components/CheckoutWrapper';
import Inventory from './Pages/admin/Inventory';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)

  const initApp = useCallback(async()=>{
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fecthBasketAsync());

    } catch (error) {
      console.log(error)
    }
  }, [dispatch])

  useEffect(()=>{
    initApp().then(()=> setLoading(false))
  },[initApp])

  const theme = createTheme({
    palette:{
      mode: 'light'
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
        <Route path='/orders' component={Order}/>
        <PrivateRoute path='/checkout' Component={CheckoutWrapper}/>
        <PrivateRoute roles={["Admin"]} path='/inventory' Component={Inventory}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>

      </Container>
    </ThemeProvider>
  );
};

export default App;
