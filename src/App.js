import React, { Suspense, lazy } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// import components
/* as Header and its children (DrawerCategories) are available on every pages
- no need to lazy load*/
import HeaderLayout from './components/header/HeaderLayout';
import HomePage from './components/homePage/HomePage';
// import elements
import Spinner from './components/elements/spinner/Spinner';
import NotFoundPage from './components/elements/NotFoundPage';

// import lazy components
const ProductsPage = lazy(() => import('./components/products/ProductsPage'));
const ProductDetails = lazy(() => import('./components/products/ProductDetails'));
const CartGrid = lazy(() => import('./components/cart/CartGrid'));

const App = () => {

  return (
    <div className="App">
      <Router>
        <HeaderLayout />
        <Suspense fallback={<Spinner/>}>
          <Switch>
            <Route exact path="/" >
              <HomePage />
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
            <Route path='*'>
              <NotFoundPage/>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  )
};

export default App;
