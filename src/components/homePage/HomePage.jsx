import React, {Suspense, lazy} from 'react';

import { makeStyles } from '@material-ui/core/styles';

// import MUi components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//import svg file
import sfondook from './sfondook.svg';

// import Mui lazy components
const Container = lazy(() => import('@material-ui/core/Container'));


// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
   paddingRight: theme.spacing(2),
   background: `url(${sfondook}) no-repeat center center fixed`,
   backgroundSize: "cover",
   display: "grid",
   gridTemplateColumns: '64px 1fr',
   gridTemplateRows: '1fr',
   [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '34% 1fr',
    paddingRight: theme.spacing(0),
   },
  },
  logoContainer: {
   gridColumn: 1,
   gridRow: 1 ,
   backgroundColor: "#fff",
   height: "100vh",
   width: 50,
   display: "flex",
   justifyContent: "flex-end",
   boxShadow: "1px 0px 14px 0px rgba(0, 0, 0,  0.6)",
  },
  logo: {
    color: theme.palette.secondary.main,
    fontSize: "1.1rem",
    fontWeight: 700,
    width: "fit-content",
    height: "fit-content",
    transform: "rotate(270deg)",
    marginTop: theme.spacing(4.5),
    paddingTop: theme.spacing(2.25),
  },
  contentContainer: {
   gridColumn: 2,
   alignSelf: "center",
   [theme.breakpoints.up('sm')]: {
    minHeight: "100vh",
    backgroundColor: "white",
    padding: theme.spacing(4),
    justifySelf: "stretch",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "-1px 0px 14px 0px rgba(0, 0, 0,  0.6)",
   },
  },
  content: {
   padding: theme.spacing(2),
   backgroundColor: "#fff",
   [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0),
    backgroundColor: "transparent",
    textAlign: "start",
   },
  },
  title: {
   color: theme.palette.primary.main,
   fontSize: "2rem",
   fontWeight: 700,
  },
  subTitle: {
   fontSize: "1rem",
  },
  startBtn: {
   marginTop: theme.spacing(4.25),
   width: "100%",
   borderRadius: 20,
   color: theme.palette.getContrastText(theme.palette.secondary.main),
   fontWeight: 700,
   backgroundColor: theme.palette.secondary.main,
   '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
   },
   '&:active': {
    backgroundColor: theme.palette.secondary.dark,
   },
   '&:focus': {
    backgroundColor: theme.palette.secondary.dark,
   },
   [theme.breakpoints.up('sm')]: {
    width: 150,
   },
  },
}));

const HomePage = () => {

  const classes = useStyles();

  return(
    <Suspense fallback={<div/>}>
    <Container maxWidth={false} className={classes.root} component="div" disableGutters >
      <div className={classes.logoContainer} >
        <Typography className={classes.logo} component="h1" variant="h6">
          SHOPIX
        </Typography>
      </div>
      <div className={classes.contentContainer} >
        <div className={classes.content}>
          <Typography className={classes.title} component="h2" variant="h5">
            Let's make today beautiful
          </Typography>
          <Typography className={classes.subTitle} component="h3" variant="h6">
            find your perfect make-up product
          </Typography>
        </div>
        <Button
          className={classes.startBtn}
          variant="contained"
          size="small"
          aria-label="start the application"
          href="/products/lipstick"
        >
        enter
      </Button>
      </div>
    </Container>
    </Suspense>
  )
};

export default HomePage;
