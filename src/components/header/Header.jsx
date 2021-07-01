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
const Hidden = lazy(() => import('@material-ui/core/Hidden'));

// import lazy component
const HeaderSwitchNavigation = lazy(() => import('./HeaderSwitchNavigation'));

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    zIndex:  theme.zIndex.drawer + 1,
  },
  switchBtnBox: {
    width: 66,
  },
  title: {
    color: theme.palette.primary.main,
    flexGrow: 1,
    fontSize: "1rem",
    fontWeight: 500,
   },
  cart: {
    color: theme.palette.primary.main,
    fontSize: "1.4rem",
  },
  badge: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    fontSize: "0.8rem",
    fontWeight: 700,
  }
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
    { location.pathname !== '/' &&
      <Suspense fallback={<div/>}>
        <ScrollToColor >
          <AppBar  className={classes.root} elevation={0} role="navigation">
            <Toolbar  className={classes.toolbarHeader} >
              <HeaderSwitchNavigation openDrawerCallback={openDrawerCallback} />
              <Typography variant="h6" className={classes.title} component="h1"  >
                SHOPIX
              </Typography>
              <IconButton className={classes.fufu} aria-label="cart" onClick={handleClick}>
                <Badge  classes={{ badge: classes.badge }} badgeContent={fullQuantityInCart} showZero >
                  <ShoppingCartIcon className={classes.cart} />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
        </ScrollToColor>
      </Suspense>
      }
      <Hidden mdUp>
        {children}
      </Hidden>
    </>
  )
};

export default Header;

Header.propTypes = {
  children: PropTypes.element.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  openDrawerCallback: PropTypes.func.isRequired,
}
