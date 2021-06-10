import React, {Suspense, lazy} from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { useMediaQuery } from "@material-ui/core";

// import MUI components
import Drawer from '@material-ui/core/Drawer';

const DrawerList = lazy(() => import('./DrawerList'));

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
    backgroundColor: "#F5F5F5",
    },
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
    }
  },
}));

const  DrawerCategories = ({mobileOpen, closeDrawerCallback}) => {

  const classes = useStyles();

/* switch drawer variant from temporary to permanent on desktop size (lg and up)
     useMediaQuery automatically provides useTheme() as an argument */
  const isLargeScreen = useMediaQuery(theme => theme.breakpoints.up("md"));


  return (
    <>
      <Drawer
        PaperProps={{ elevation: 5 }}
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
    </>
  );
};

export default DrawerCategories;

DrawerCategories.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  closeDrawerCallback: PropTypes.func.isRequired,
}
