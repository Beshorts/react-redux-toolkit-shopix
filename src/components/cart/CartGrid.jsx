import React from 'react';

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

// import components
import CartCard from './CartCard';

//import MUI transitions
import Grow from '@material-ui/core/Grow';

//import elements
import ScrollToTopOnPage from '../elements/ScrollToTopOnPage';


// rules for custom components style
const useStyles = makeStyles((theme) => ({
  rootContainer: {
    marginBottom: 60,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up('lg')]: {
     maxWidth: 1000,
     marginLeft: 'calc(40% - 250px)',
    },
  },
  cardCartSummary: {
    marginTop: 112,
    marginBottom: theme.spacing(2),
    color: theme.palette.texts.main,
    display: "flex",
    [theme.breakpoints.up('xs')]: {
     flexDirection: "column",
     padding: 16,
    },
    [theme.breakpoints.up('sm')]: {
     flexDirection: "row",
     justifyContent: "space-between",
     padding: "16px 20px",
    },
  },
  headerCart: {
   marginBottom: 0,
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
            <Typography gutterBottom variant="subtitle1" component="h2" className={classes.headerCart}>
              { fullQuantityInCart === 0
                ? "any products added yet"
                : `products added: ${fullQuantityInCart}`
              }
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="h3" className={classes.headerCart}>
             { products.length === 0
               ? null
               : `total purchases: $${(totalPurchase.toFixed(2))}`
             }
            </Typography>
          </Card>
        </Grow>
      </div>
      <Grid container spacing={1}>
        {products.map(product => (
          <Grid  item xs={12} sm={12} md={12} lg={12} xl={12} key={product.id} >
            <CartCard product={product} key={product.id} />
          </Grid>
        ))}
      </Grid>
      <ScrollToTopOnPage >
        <Fab color="primary" size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTopOnPage>
    </Container>
  );
};

export default CartGrid;
