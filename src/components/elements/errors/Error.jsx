import React from 'react';

import { useSelector } from 'react-redux'

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

// Mui components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: '50%',
    top: '20%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  }
}));

const Error = () => {

  const classes = useStyles();
    // API error response
  const error = useSelector(state => state.products.error);

  return (
    <Container className={classes.root} >
      <div className="error" />
      <Typography variant="h6" component="h1" color="error" >
        {error}
      </Typography>
      <Typography variant="h6" component="h2" color="error" >
        Service temporarily unavailable
      </Typography>
    </Container>
  )
};

export default Error;

Error.propTypes = {
  error: PropTypes.string,
};

