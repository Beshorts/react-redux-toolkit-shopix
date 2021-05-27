import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// import components
import HeaderLayout from './components/header/HeaderLayout';
import ProductsPage from './components/products/ProductsPage';
import ProductDetails from './components/products/ProductDetails';
import CartGrid from './components/cart/CartGrid';


const App = () => {
  return (
    <div className="App">
      <Router>
        <HeaderLayout  />
        <Switch>
          <Route exact path="/"  >
            {/* for this project user is directly redireted on category products*/}
            <Redirect from="/" to="/products/lipstick" />
          </Route>
          <Route  path='/products/:category'>
            <ProductsPage />
          </Route>
          <Route path="/product/:productId">
            <ProductDetails />
          </Route>
          <Route path="/my_cart" >
            <CartGrid />
          </Route>
        </Switch>
      </Router>
    </div>
  )
};

export default App;
