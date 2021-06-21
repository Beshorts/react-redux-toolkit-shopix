import React, { Suspense, lazy } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// import elements
import Spinner from './components/elements/spinner/Spinner';

// import lazy components
const HeaderLayout = lazy(() => import('./components/header/HeaderLayout'));
const ProductsPage = lazy(() => import('./components/products/ProductsPage'));
const ProductDetails = lazy(() => import('./components/products/ProductDetails'));
const CartGrid = lazy(() => import('./components/cart/CartGrid'));
const NotFoundPage = lazy(() => import('./components/elements/NotFoundPage'));

const App = () => {

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Spinner/>}>
          <HeaderLayout />
            <Switch>
              {/* for this project, the app starts directly on products category page */}
              <Redirect exact path="/" to="/products/lipstick" />
              <Route  path='/products/:category'>
                <ProductsPage />
              </Route>
              <Route path="/product/:productId" >
                <ProductDetails />
              </Route>
              <Route path="/my_cart">
                <CartGrid />
              </Route>
              <Route path='*' >
                <NotFoundPage />
              </Route>
            </Switch>
        </Suspense>
      </Router>
    </div>
  )
};

export default App;
