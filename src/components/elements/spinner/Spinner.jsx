import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

// Mui components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import './spinner.css';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    display:"flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
    minHeight:"100vh",
    [theme.breakpoints.up('lg')]: {
     maxWidth: 1000,
     marginLeft: 'calc(40% - 270px)',
    },
   }
}));

const Spinner = (props) => {

  const classes = useStyles();

  const { color, size } = props;

  return (
    <Container className={classes.root} >
      <div className="spinner" style={{ background: color, width: size, height: size }} />
      <Typography variant="h6" component="h1" >
        Loading...
      </Typography>
    </Container>
  )
};

export default Spinner;

Spinner.propTypes = {
  /** hex color  */
  color: PropTypes.string,
  /** size in pixel */
  size: PropTypes.number,
}

Spinner.defaultProps = {
  color: '#4056F4',
  size: 64,
}
