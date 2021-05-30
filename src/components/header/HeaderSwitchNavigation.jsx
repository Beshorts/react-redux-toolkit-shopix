import React from 'react';

import {
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from "@material-ui/core";

// import MUI components
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import MenuIcon from "@material-ui/icons/Menu";
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  switchBtnBox: {
    width: 66,
  },
  menuIcon: {
    color: "inherit",
    },
    fabIcon: {
     marginRight: 3,
    },
}));

const HeaderSwitchNavigation = ({ openDrawerCallback }) => {

  const classes = useStyles();

  let history = useHistory();

  const location = useLocation();

  /* disable Menu btn when categories drawer is permanent on desktop size (lg and up)
     useMediaQuery automatically provides useTheme() as an argument */
  const isLargeScreen = useMediaQuery(theme => theme.breakpoints.up("lg"));

  // create variable to switch ArrowBackIcon btn on the right path
  const productDetails = useRouteMatch('/product/:productId');
  const isCartPage = location.pathname === "/my_cart";
  const displayUi = productDetails || isCartPage;

  const handleBackClick = () => {
    history.goBack();
  };

  return(
    <Box className={classes.switchBtnBox}>
      { displayUi &&
        <Zoom in={true} unmountOnExit  >
          <Fab color="primary" aria-label="go back" onClick={handleBackClick} >
            <ArrowBackIcon />
          </Fab>
        </Zoom>
      }
      {!displayUi &&
        <Zoom in={true} unmountOnExit >
          <IconButton
            className={classes.menuIcon}
            disabled={isLargeScreen ? true : false}
            aria-label="Menu"
            onClick={openDrawerCallback}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Zoom>
      }
    </Box>
  )
}

export default React.memo(HeaderSwitchNavigation);

HeaderSwitchNavigation.propTypes = {
  openDrawerCallback: PropTypes.func.isRequired,
}
