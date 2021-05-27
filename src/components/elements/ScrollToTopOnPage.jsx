import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

// import MUI component
import Zoom from '@material-ui/core/Zoom';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const ScrollToTopOnPage = ({ children })  => {

  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });


  const handleClick = (event) => {

    const anchor = document.querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="navigation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

export default ScrollToTopOnPage;

ScrollToTopOnPage.propTypes = {
  children: PropTypes.element.isRequired,
}
