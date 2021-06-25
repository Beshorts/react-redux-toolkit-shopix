import React, {Suspense, lazy} from 'react';

import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

// import Mui component
import Skeleton from '@material-ui/lab/Skeleton';

// import custom Skeleton style
import {SkeletonWrapper} from './styles';
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
    maxWidth: 182,
    margin: theme.spacing(0, "auto"),
    "& .MuiCardHeader-root": {
     padding: theme.spacing(1.25, 2, 0, 2),
    },
    "& .MuiCardMedia-img": {
     objectFit: "contain",
    },
    "& .MuiCardActions-root": {
     justifyContent: "space-between",
     padding: theme.spacing(0, 4, 2, 4),
    },
  },
  nameProduct: {
   color: theme.palette.primary.main,
   textAlign: "center",
   fontSize: "0.9rem",
   fontWeight: 400,
  },
  priceProduct: {
   color: theme.palette.deepPrimary.main,
   fontSize: "0.9rem",
   fontWeight: 500,
  },
}));

const ProductCard = ({ columnIndex, rowIndex, style, data }) => {

  const classes = useStyles();
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
        <Suspense
          fallback={
            <SkeletonWrapper >
              <Skeleton variant="rect" height={160} width={180} style={{ marginBottom: 2}} />
              <Skeleton variant="text" width="70%" height={10} />
              <Skeleton variant="text" width="30%" height={10} />
            </SkeletonWrapper>
          }>
          <Card elevation={3}  className={classes.root} key={id} >
            <CardHeader
              action={
                <FavoriteButton
                  isFavorited={getCurrentFavoriteItem}
                  onClick={handleFavoriteButton}
                />
              }
            />
            <CardActionArea
              component={Link} to={`/product/${id}`}
            >
              <LazyCardMedia
                alt="beautiful make-up product"
                image={image_link}
                height={80}
              />
            </CardActionArea>
              <CardContent >
                <Typography className={classes.nameProduct} noWrap variant="h6" component="h1" >
                  {name}
                </Typography>
              </CardContent>
            <CardActions >
              <Typography className={classes.priceProduct}  variant="h6" component="h2">
                 {price_sign}{price}
              </Typography>
              <CartButton
                 added={getCurrentCartItem}
                 onClick={handleCartButton}
              />
            </CardActions>
          </Card>
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
