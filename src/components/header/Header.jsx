import React , { useCallback, Suspense, lazy } from 'react';

import { useHistory, useLocation } from "react-router-dom";

import PropTypes from 'prop-types';

import { useSelector} from 'react-redux';

// import selectors
import { fullQuantitySelector } from '../../selectors/cart';

import { makeStyles } from '@material-ui/core/styles';

// import elements
import ScrollToColor from '../elements/HeaderScrollToColor';

// import MUI lazy component
const AppBar = lazy(() => import('@material-ui/core/AppBar'));
const Toolbar = lazy(() => import('@material-ui/core/Toolbar'));
const Badge = lazy(() => import('@material-ui/core/Badge'));
const IconButton = lazy(() => import('@material-ui/core/IconButton'));
const Typography = lazy(() => import('@material-ui/core/Typography'));
const ShoppingCartIcon = lazy(() => import('@material-ui/icons/ShoppingCart'));
const HeaderSwitchNavigation = lazy(() => import('./HeaderSwitchNavigation'));

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    zIndex:  theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
  },
  toolbarHeader: {
    minHeight: theme.spacing(11.75),
  },
  switchBtnBox: {
    width: 66,
  },
  title: {
    flexGrow: 1,
    fontWeight: 700,
    fontSize: "1.1rem",
    },
  cart: {
    fontSize: "1.4rem",
  },
}));

const Header = ({ children, mobileOpen, openDrawerCallback }) => {

  const classes = useStyles();

  let history = useHistory();

  const location = useLocation();

  // total amount of products added to cart
  const fullQuantityInCart  = useSelector(fullQuantitySelector);

  // create variable to avoid render cart page if user is already on it
  const isCartPage = location.pathname === "/my_cart";

  const handleClick = useCallback(() => {
    if (!isCartPage) {
      history.push('/my_cart');
      window.scrollTo(0, 0);
    }
  },[history, isCartPage]);

  return(
    <>
      <Suspense fallback={<div/>}>
        <ScrollToColor >
          <AppBar  className={classes.root} elevation={0} role="navigation">
            <Toolbar  className={classes.toolbarHeader} >
              <HeaderSwitchNavigation openDrawerCallback={openDrawerCallback} />
              <Typography variant="h6" className={classes.title} component="h1"  >
                SHOPIX
              </Typography>
              <IconButton aria-label="cart" onClick={handleClick}>
                <Badge overlap="circle" color="secondary" badgeContent={fullQuantityInCart} showZero >
                  <ShoppingCartIcon className={classes.cart} color="primary"/>
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
        </ScrollToColor>
      </Suspense>
        {children}
    </>
  )
};

export default Header;

Header.propTypes = {
  children: PropTypes.element.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  openDrawerCallback: PropTypes.func.isRequired,
}
