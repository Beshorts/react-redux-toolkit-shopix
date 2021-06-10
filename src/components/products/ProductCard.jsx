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
    marginRight: theme.spacing(1.75),
    borderRadius: 8,
    color: theme.palette.texts.main,
  },
  cardActionArea: {
   width: "100%",
  },
  media: {
    margin: theme.spacing(0, 'auto'),
    width: 84,
    backgroundSize: "cover",
  },
  cardHeader: {
   padding: theme.spacing(1.25, 2, 0, 2),
  },
  nameProduct: {
   textAlign: "center",
   opacity: 0.8,
   fontSize: "0.9rem",
   fontWeight: 400,
  },
  cardAction: {
    justifyContent: "space-between",
    padding:theme.spacing(0, 2, 1.5, 2),
  },
  priceProduct: {
   color: theme.palette.pricingColor.main,
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

  // check if card exist and retrieve its id
  const checkId = productCard ? id : null;

  // destructure custom hooks
  const { cartItem, cart } = useAddRemoveCartItem(checkId);
  const { favoriteItem, favorite } = useAddRemoveFavorite(checkId);

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
          <Card elevation={3} className={classes.root} key={id} >
            <CardHeader
              className={classes.cardHeader}
              action={
                <FavoriteButton
                  className={classes.favoriteIcon}
                  isFavorited={favoriteItem}
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
              <CardContent >
                <Typography className={classes.nameProduct} noWrap variant="h6" component="h1" >
                  {name}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardAction}  >
              <Typography className={classes.priceProduct}  variant="h6" component="h2">
                 {price_sign}{price}
              </Typography>
              <CartButton
                 added={cartItem}
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
