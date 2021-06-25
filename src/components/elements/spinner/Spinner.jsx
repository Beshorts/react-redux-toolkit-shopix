import React from 'react';

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
    margin: "auto",
    textAlign: "center",
    [theme.breakpoints.up('lg')]: {
     maxWidth: 1000,
     marginLeft: 'calc(40% - 350px)',
    },
   }
}));

const Spinner = () => {

  const classes = useStyles();


  return (
    <Container className={classes.root} >
     <div className="spinner"></div>
      <Typography variant="subtitle1" component="h1" >
        loading...
      </Typography>
    </Container>
  )
};

export default Spinner;


