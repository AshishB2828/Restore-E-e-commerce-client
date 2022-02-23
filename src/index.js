import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from  'react-router-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import { StoreProvider } from './context/StoreContext';
import { store } from './store/configureStore';



ReactDOM.render(
  
    <BrowserRouter>
    <StoreProvider>
      <Provider store={store}>
      <App />
      </Provider>
    </StoreProvider>
    </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
