import React, {Suspense, lazy} from 'react';

import { useSelector} from 'react-redux';

// redux selector
import {
  productsCartSelector,
  totalCartPriceSelector,
  fullQuantitySelector,
} from '../../selectors/cart';

import { makeStyles } from '@material-ui/core/styles';

//import Mui components
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


//import MUI transitions
import Grow from '@material-ui/core/Grow';

//import elements
import ScrollToTopOnPage from '../elements/ScrollToTopOnPage';

// import lazy components
const CartCard = lazy(() => import('./CartCard'));

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  rootContainer: {
    paddingBottom: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    [theme.breakpoints.up('md')]: {
     maxWidth: 415,
    },
    [theme.breakpoints.up('lg')]: {
     maxWidth: 492,
    },
    [theme.breakpoints.up('xl')]: {
     maxWidth: 800,
    },
  },
  cardCartSummary: {
    margin: theme.spacing(14, 0, 2, 0),
    color: theme.palette.primary.main,
    display: "flex",
    [theme.breakpoints.up('xs')]: {
     flexDirection: "column",
     padding: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
     flexDirection: "row",
     justifyContent: "space-between",
     padding: theme.spacing(2, 2.5),
    },
  },
  headerCart: {
   fontWeight: 500,
  },

}));

const CartGrid = () => {

 const classes = useStyles();

 // total amount of products added to cart
  const fullQuantityInCart  = useSelector(fullQuantitySelector);

  // all products state added to cart
  const products = useSelector(productsCartSelector);

  // cart price total amount
  const totalPurchase = useSelector(totalCartPriceSelector);

  return(
    <Container className={classes.rootContainer}  >
      <div>
        <Grow in={true} timeout={500}>
          <Card className={classes.cardCartSummary} id="back-to-top-anchor">
            <Typography  variant="subtitle1" component="h2" className={classes.headerCart}>
              { fullQuantityInCart === 0
                ? "any products added yet"
                : `${fullQuantityInCart} items added`
              }
            </Typography>
            <Typography variant="subtitle1" component="h3" className={classes.headerCart}>
             { products.length === 0
               ? null
               : `purchase $${(totalPurchase.toFixed(2))}`
             }
            </Typography>
          </Card>
        </Grow>
      </div>
      <Grid container >
        {products.map(product => (
          <Grid  item xs={12} sm={12} md={12} lg={12} xl={12} key={product.id} >
          <Suspense fallback={<div/>}>
            <CartCard product={product} key={product.id} />
            </Suspense>
          </Grid>
        ))}
      </Grid>
      <ScrollToTopOnPage >
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTopOnPage>
    </Container>
  );
};

export default CartGrid;
