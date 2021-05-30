import React, {Suspense, lazy} from 'react';

import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

// Mui components
import Zoom from '@material-ui/core/Zoom';

// import elements
import { useHandlerButton } from '../elements/customHooks';

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
    margin: "8px 8px 12px 8px",
    borderRadius: 8,
    color: theme.palette.texts.main,
  },
  actionBox:{
   paddingTop: 16,
  },
  cardActionArea: {
   width: "100%",
  },
  media: {
    margin: "auto",
    width: 118,
    backgroundSize: "cover",
    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "scale(1.08)",
    },
  },
  cardHeader: {
   padding: "16px 16px 0 16px",
  },
  cardHeaderTitle: {
   fontWeight: 700,
   fontSize: "1.2rem",
  },
  nameProductContainer: {
    padding: "12px 16px 12px 16px",
  },
  nameProduct: {
   fontSize: "1rem",
   textAlign: "center",
   fontWeight: 500,
  },
  cardAction: {
    justifyContent: "space-between",
    padding: 16,
  },
  priceProduct: {
   color: theme.palette.pricingColor.main,
   fontSize: "1.1rem",
   fontWeight: 500,
  },
}));

const ProductCard = ({ columnIndex, rowIndex, style, data }) => {

  const classes = useStyles();

  // destructure object
  const {productsFiltered, columnCount} = data;

  // create an index up to 11
  const singleColumnIndex = columnIndex + rowIndex * columnCount;

  /* create single card objects from array up to singleColumn result,
   when user scroll the grid recreate them with new objects from the array */
  const card = productsFiltered[singleColumnIndex];

  // check if card exist and retrieve its id
  const checkId = card ? card.id : null;

  // destructure custom hook
  const { cartItem, cart, favoriteItem, favorite } = useHandlerButton(checkId);

  const handleCartButton = () =>  {
    cart(card)
  };

  const handleFavoriteButton = () => {
    favorite(card)
  };

  return(
    <div style={style} className="cellContainer">
      {card && (
      <div
      className="cell"
      id={card.id}
      style={{
        width: "100%",
        height: "100%",
        display: "inline-block",
      }}
      >
      <Zoom in={true}>
        <Suspense fallback={<p>loading...</p>}>
          <Card elevation={3} className={classes.root} key={card.id} >
            <CardHeader
              className={classes.cardHeader}
              classes={{title: classes.cardHeaderTitle}}
              action={
                <FavoriteButton
                  className={classes.favoriteIcon}
                  isFavorited={favoriteItem}
                  onClick={handleFavoriteButton}
                />
              }
              title={card.brand}
            />
            <CardActionArea
              className={classes.cardActionArea}
              component={Link} to={`/product/${card.id}`}
            >
              <LazyCardMedia
                className={classes.media}
                alt="beautiful make-up product"
                image={card.image_link}
                height={120}
              />
              <CardContent className={classes.nameProductContainer} >
                <Typography className={classes.nameProduct} noWrap variant="h6" component="h1" >
                  {card.name}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardAction}  >
              <Typography className={classes.priceProduct}  variant="h6" component="h2">
                 {card.price_sign}{card.price}
              </Typography>
              <CartButton
                 added={cartItem}
                 onClick={handleCartButton}
              />
            </CardActions>
          </Card>
        </Suspense>
      </Zoom>
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
  data: PropTypes.object.isRequired
}
