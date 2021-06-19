import React from 'react';

import PropTypes from 'prop-types';

import { useScrollTrigger } from "@material-ui/core";

/* add on scroll new behaviours to MUI AppBar (Header component)
   as bg, shadow, change color of MenuIcon and brand title */

const ScrollHandler = props => {

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(props.children, {

    style: {
      backgroundColor: trigger ? "#67B99A" : "transparent",
      elevation: trigger ? 0 : 0,
      boxShadow: trigger ? "0 3px 5px 2px rgba(0, 0, 0, .2)" : "none",
      transition: trigger ? "0.3s" : "0.5s",
    }
  })
};

const ScrollToColor = props => {

  return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

export default ScrollToColor;

ScrollHandler.propTypes = {
  children: PropTypes.element.isRequired,
}

ScrollToColor.propTypes = {
  children: PropTypes.element.isRequired,
}
