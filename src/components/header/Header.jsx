import React , { useCallback } from 'react';

import { useHistory, useLocation } from "react-router-dom";

import PropTypes from 'prop-types';

import { useSelector} from 'react-redux';

// import selectors
import { fullQuantitySelector } from '../../selectors/cart';

import { makeStyles } from '@material-ui/core/styles';

// import MUI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HeaderSwitchNavigation from './HeaderSwitchNavigation';

// import elements
import ScrollToColor from '../elements/HeaderScrollToColor';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    zIndex:  theme.zIndex.drawer + 1,
    color: theme.palette.texts.main,
  },
  toolbarHeader: {
    minHeight: 94,
  },
  switchBtnBox: {
    width: 66,
  },
  menuIcon: {
    },
  title: {
    flexGrow: 1,
    fontWeight: 600,
    },
  cart: {
    fontSize: "1.8rem",
  }
}));

const Header = ({ children, openDrawerCallback }) => {
    console.count('header')

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
    <React.Fragment>
      <nav >
        <ScrollToColor >
          <AppBar  className={classes.root} elevation={0} >
            <Toolbar  className={classes.toolbarHeader} >
              <HeaderSwitchNavigation openDrawerCallback={openDrawerCallback} />
              <Typography variant="h6" className={classes.title} component="h1"  >
                SHOPIX
              </Typography>
              <IconButton  aria-label="cart" onClick={handleClick}>
                <Badge overlap="circle" color="secondary" badgeContent={fullQuantityInCart} showZero >
                  <ShoppingCartIcon className={classes.cart} color="primary"/>
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
        </ScrollToColor>
      </nav>
      {children}
    </React.Fragment>
  )
};

export default Header;

Header.propTypes = {
  children: PropTypes.element.isRequired,
  openDrawerCallback: PropTypes.func.isRequired,
}
