import React, {Suspense, lazy} from 'react';

import { useLocation } from "react-router-dom";

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { useMediaQuery } from "@material-ui/core";

// import MUI components
import Drawer from '@material-ui/core/Drawer';

const DrawerList = lazy(() => import('./DrawerList'));

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
    }
  },
  paper: {
   backgroundColor: theme.palette.background.default,
},
}));

const  DrawerCategories = ({mobileOpen, closeDrawerCallback}) => {

  const classes = useStyles();

  const location = useLocation();

/* switch drawer variant from temporary to permanent on desktop size (lg and up)
     useMediaQuery automatically provides useTheme() as an argument */
  const isLargeScreen = useMediaQuery(theme => theme.breakpoints.up("md"));
  // unmount drawer on homepage
  return (
    <>
      { location.pathname !== '/' &&
        <Drawer
          classes={ {paper: classes.paper}}
          className={classes.root}
          variant={isLargeScreen ? 'permanent' : 'temporary'}
          anchor={'left'}
          open={mobileOpen}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          onClose={closeDrawerCallback}
        >
          <Suspense fallback={<div />}>
            <DrawerList anchor='left'  closeDrawerCallback={closeDrawerCallback} />
          </Suspense>
        </Drawer>
      }
    </>
  );
};

export default DrawerCategories;

DrawerCategories.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  closeDrawerCallback: PropTypes.func.isRequired,
}
