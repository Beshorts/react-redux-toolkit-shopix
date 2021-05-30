import React from 'react';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

// import MUI component
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  }
}));

const NotFoundPage = () => {

  const classes = useStyles();

  return (
    <Container className={classes.root} >
      <div className="notFound" />
       <Typography variant="h5" component="h1" >
       404 PAGE NOT FOUND
      </Typography>
      <Typography variant="h6" component="h2" >
        <Link to="/">Back to Home </Link>
      </Typography>
    </Container>
  )
}
export default NotFoundPage;
