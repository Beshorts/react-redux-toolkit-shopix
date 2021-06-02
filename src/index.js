import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';


// redux store and persist
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import {store, persistor} from './app/store';

// redux action
import {fetchProducts} from './features/productsAPI/productsAPISlice';

// MUI setup for custom theme
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// import component
import App from './App';

import './index.css';

import reportWebVitals from './reportWebVitals';

// custom theme for styling components
let theme = createMuiTheme({
   palette: {
    background: {
      default: "#F5F5F5",
    },
    // cartIcon + BackIcon
    primary: {
      main: "#4056F4",
      contrastText: '#fff',
    },
    // cartBadge
    secondary: {
       main: "#F65BE3",
       contrastText: '#fff',
    },
    // btn FavoriteIcon onClick
    error: {
      main: "#ff5e78",
    },
     // all texts
    texts: {
       main: "#114B5F",
    },
    // color pricing
    pricingColor: {
       main: "#bc4d08",
    },
  },
});

// keep typography responsive cross devices
theme = responsiveFontSizes(theme);

// dispatch thunk when App first mounts
store.dispatch(fetchProducts());

ReactDOM.render(
     <ThemeProvider theme={theme}>
      <CssBaseline />
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          </PersistGate>
        </Provider>
    </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

