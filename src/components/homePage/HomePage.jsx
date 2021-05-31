import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

// import MUI components
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    minHeight:"100vh",
    color: "#FFFF",
    [theme.breakpoints.up('lg')]: {
     maxWidth: 1000,
     marginLeft: 'calc(40% - 270px)',
    },
  },
  textsBox: {
    textAlign: "center",
    padding: 28,
    borderRadius: 6,
    backgroundColor: theme.palette.texts.main,
  },
}));

const HomePage = () => {

    const classes = useStyles();

  return(
    <Container className={classes.root}>
      <Box className={classes.textsBox}>
        <Typography variant="h4" component="h1" >
          SHOPIX
        </Typography>
        <Typography gutterBottom variant="h5" component="h2" >
          Make Up e-commerce
        </Typography>
         <Typography gutterBottom subtitle1="h6" component="h3" >
          Navigate over products categories, see product info, add / remove it from shopping cart or favorites,
          increase / decrease its quantity.
        </Typography>
      </Box>
    </Container>
  )
};

export default HomePage;
