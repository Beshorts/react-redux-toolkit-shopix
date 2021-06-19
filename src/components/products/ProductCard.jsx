import React, {Suspense, lazy} from 'react';

import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

// import elements
import { useAddRemoveCartItem, useAddRemoveFavorite } from '../elements/customHooks';

// import MUI components as lazy load
const Card = lazy(() => import('@material-ui/core/Card'));
const CardHeader = lazy(() => import('@material-ui/core/CardHeader'));
const CardActionArea = lazy(() => import('@material-ui/core/CardActionArea'));
const CardActions = lazy(() => import('@material-ui/core/CardActions'));
const CardContent = lazy(() => import('@material-ui/core/CardContent'));
const Typography = lazy(() => import('@material-ui/core/Typography'));
// import elements as lazy load
const CartButton = lazy(() => import('../elements/CartButton'));
const FavoriteButton = lazy(() => import('../elements/FavoriteButton'));
const LazyCardMedia = lazy(() => import('../elements/LazyCardMedia'));


// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    height: 134,
    margin: theme.spacing(0, 1.75, 0, 1.75),
  },
  cardHeader: {
   padding: theme.spacing(1.25, 2, 0, 2),
  },
  cardActionArea: {
   width: "100%",
  },
  media: {
    margin: theme.spacing(0, 'auto'),
    marginBottom: theme.spacing(2),
    width: 84,
    backgroundSize: "cover",
  },
  cardContent: {
  padding:"16px 32px 16px 32px ",
  },
  nameProduct: {
   color: theme.palette.primary.main,
   fontSize: "0.9rem",
   fontWeight: 400,

  },
  cardAction: {
    justifyContent: "space-between",
    padding: theme.spacing(0, 4, 0, 4),
  },
  priceProduct: {
   color: theme.palette.deepPrimary.main,
   fontSize: "0.9rem",
   fontWeight: 500,
  },
}));

const ProductCard = ({ columnIndex, rowIndex, style, data }) => {
  const classes = useStyles();
console.log("productCard")
  // destructure data
  const { value, columnCount } = data;

  // create an index up to 11
  const singleColumnIndex = columnIndex + rowIndex * columnCount;

  /* create single card objects from array up to singleColumn result,
   when user scroll the grid recreate them with new objects from the array */
  const productCard = value[singleColumnIndex];

  // destructure object
  const { id, image_link, name, price_sign, price } = productCard;

  //create variable checking if card exist and retrieve its id
  const checkId = productCard && id ;

  // destructure custom hooks
  const { getCurrentCartItem, cart } = useAddRemoveCartItem(checkId);
  const { getCurrentFavoriteItem, favorite } = useAddRemoveFavorite(checkId);

  const handleCartButton = () =>  {
    cart(productCard)
  };

  const handleFavoriteButton = () => {
    favorite(productCard)
  };

  const cellContainerStyle = {
    width: "100%",
    height: "100%",
    display: "inline-block",
  };


  return(
    <div style={style} className="cellContainer">
      {productCard && (
      <div
      className="cell"
      id={id}
      style={cellContainerStyle}
      >
        <Suspense fallback={<p>loading...</p>}>
          <Card elevation={3}  className={classes.root} key={id} >
            <CardHeader
              className={classes.cardHeader}
              action={
                <FavoriteButton
                  isFavorited={getCurrentFavoriteItem}
                  onClick={handleFavoriteButton}
                />
              }
            />
            <CardActionArea
              className={classes.cardActionArea}
              component={Link} to={`/product/${id}`}
            >
              <LazyCardMedia
                className={classes.media}
                alt="beautiful make-up product"
                image={image_link}
                height={80}
              />
            </CardActionArea>
          </Card>
              <CardContent className={classes.cardContent} >
                <Typography className={classes.nameProduct} noWrap variant="h6" component="h1" >
                  {name}
                </Typography>
              </CardContent>
            <CardActions className={classes.cardAction}  >
              <Typography className={classes.priceProduct}  variant="h6" component="h2">
                 {price_sign}{price}
              </Typography>
              <CartButton
                 added={getCurrentCartItem}
                 onClick={handleCartButton}
              />
            </CardActions>
        </Suspense>
     </div>
     )
    }
   </div>
  )
};

export default ProductCard;

ProductCard.propTypes = {
  columnIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  productCard: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    brand: PropTypes.string.isRequired,
    image_link: PropTypes.string.isRequired,
    price_sign: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })
}
