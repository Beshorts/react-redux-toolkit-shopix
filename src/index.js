import React from 'react';
import ReactDOM from 'react-dom';


// redux store and persist
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import {store, persistor} from './app/store';

// redux action
import {fetchProducts} from './features/productsAPI/productsAPISlice';

// MUI setup for custom theme
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// import component
import App from './App';

import './index.css';

import reportWebVitals from './reportWebVitals';

// custom theme for styling components
let theme = createMuiTheme({
  typography: {
    fontFamily: [
    'Roboto',
    'sans-serif'],
  },
   palette: {
    background: {
     default: "#fff",
    },
    // texts, icons, BackIcon
    primary: {
      main: "#19392B",
      contrastText: '#fff',
    },
    // logo homepage, cartBadge, btn add/remove increment/decrement bg
    secondary: {
     main: "#ff6000",
     dark: "#b24300",
     contrastText: "#fff",
    },
    // btn FavoriteIcon onClick
    error: {
      main: "#ff5e78",
    },
    greenLeading: {
      main: "#67b99a"
    },
    greenChip: {
      main: "#587e70",
    },
    // btn cart and products on select/hover
    darkPurple: {
      main: "#94778B",
    },
    // grid headers subtitle
    grey: {
      main: "#6d706d",
    },
    // color pricing
    deepPrimary: {
     main: "#02271B",
    },
    contrastThreshold: 3,
    tonalOffset: 0.4,
  },
});

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

