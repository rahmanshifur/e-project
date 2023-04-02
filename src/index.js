import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

// IMPORT COMPONENT
import App from './app'
import Store from './store'

// IMPORT STYLE 
import 'bootstrap/dist/css/bootstrap.css';
import './assets/scss/style.scss';

// IMPORT EASY peasy
import { StoreProvider } from 'easy-peasy'

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={Store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
