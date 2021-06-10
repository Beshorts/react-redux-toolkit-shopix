import React from 'react';

import { useParams } from "react-router-dom";

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

// redux actions
import {selectProductById} from '../../features/productsAPI/productsAPISlice';

import { makeStyles } from '@material-ui/core/styles';

// import MUI components
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// impport elements
import CartButton from '../elements/CartButton';
import FavoriteButton from '../elements/FavoriteButton';
import { useAddRemoveCartItem, useAddRemoveFavorite } from '../elements/customHooks';


// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.texts.main,
    marginBottom: theme.spacing(5),
      minHeight: "100vh",
    [theme.breakpoints.up('md')]: {
     maxWidth: 767,
     marginLeft: 'calc(40% - 180px)',
    },
    [theme.breakpoints.up('lg')]: {
     maxWidth: 1086,
     marginLeft: 'calc(40% - 302px)',
    },
    [theme.breakpoints.up('xl')]: {
     maxWidth: 1600,
     marginLeft: 'calc(40% - 500px)',
    },
  },
  imageBg: {
    backgroundColor: "#FFF",
    display: "grid",
    marginTop: theme.spacing(11.25),
    paddingTop: theme.spacing(3.75),
    paddingBottom: theme.spacing(3.75),
  },
  imageProduct: {
    margin: theme.spacing(0,'auto'),
    width: 162,
  },
  textAndIcon: {
    width: "100%",
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  brandName: {
    fontWeight: 700,
    fontSize: "1.1rem",
  },
  productName: {
    fontWeight: 500,
  },
  productType: {
    fontWeight: 700,
    fontSize: "0.9rem",
    opacity: 0.7,
  },
  productDescription: {
    fontWeight: 400,
    fontSize: "0.9rem",
    lineHeight: 1.6,
  },
  price: {
    color: theme.palette.pricingColor.main,
    fontSize: "1rem",
    fontWeight: 700,
  },
}));


const ProductDetails = () => {

  const classes = useStyles();

  // get clicked id
  let { productId } = useParams();

  // get the product object
  const singleProduct = useSelector(state => selectProductById(state, productId));

  // destructuring object
  const {image_link, brand, id, name, product_type, description, price_sign, price} = singleProduct;

  //destructure custom hook
  const { cartItem, cart } = useAddRemoveCartItem(id);
  const { favoriteItem, favorite } = useAddRemoveFavorite(id);

  const handleCartButton = () =>  {
    cart(singleProduct)
  };

  const handleFavoriteButton = () => {
    favorite(singleProduct)
  };

  return(
    <Container className={classes.root} >
      <React.Fragment>
        <Box  className={classes.imageBg}>
          <img className={classes.imageProduct} src={image_link} alt="beautiful product"/>
        </Box>
        <Box  className={classes.textAndIcon}>
          <Typography  className={classes.brandName} variant="h4" component="h2">
            {brand}
          </Typography>
          <FavoriteButton
            className={classes.favoriteIcon}
            isFavorited={favoriteItem}
            onClick={handleFavoriteButton}
          />
        </Box>
        <Typography className={classes.productName} variant="h5" component="h3">
          {name}
        </Typography>
        <Typography gutterBottom className={classes.productType} variant="subtitle1" component="h4">
          {product_type}
        </Typography>
        <Typography paragraph className={classes.productDescription} variant="body2" component="h5">
          {description}
        </Typography>
        <Box className={classes.textAndIcon}>
          <Typography className={classes.price} variant="h5" component="h6">
            {price_sign}{price}
          </Typography>
          <CartButton
            added={cartItem}
            onClick={handleCartButton}
          />
        </Box>
      </React.Fragment>
    </Container>
  )
}

export default ProductDetails;

ProductDetails.propTypes = {
  singleProduct: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    brand: PropTypes.string.isRequired,
    image_link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    product_type: PropTypes.string.isRequired,
    price_sign: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })
}
