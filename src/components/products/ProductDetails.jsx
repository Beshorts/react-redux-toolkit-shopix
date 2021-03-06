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
import LazyCardMedia from '../elements/LazyCardMedia';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#FFFF",
    color: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
     maxWidth: 667,
    },
    [theme.breakpoints.up('lg')]: {
     maxWidth: 1086,
    },
  },
  imageBg: {
    paddingTop: theme.spacing(3.75),
    marginTop: theme.spacing(11.25),
  },
  imageProduct: {
    width: 162,
    margin: theme.spacing(0,'auto'),
  },
  textAndIcon: {
    width: "100%",
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2, 0, 2, 0),
    marginBottom: theme.spacing(4),
  },
  brandName: {
    fontWeight: 700,
    fontSize: "1.1rem",
  },
  productName: {
    fontWeight: 500,
  },
  productType: {
    fontSize: "0.9rem",
    fontWeight: 700,
    opacity: 0.7,
  },
  productDescription: {
    fontSize: "0.9rem",
    fontWeight: 400,
    lineHeight: 1.6,
  },
  price: {
    color: theme.palette.deepPrimary.main,
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
  const { getCurrentCartItem, cart } = useAddRemoveCartItem(id);
  const { getCurrentFavoriteItem, favorite } = useAddRemoveFavorite(id);

  const handleCartButton = () =>  {
    cart(singleProduct)
  };

  const handleFavoriteButton = () => {
    favorite(singleProduct)
  };

  return(
    <Container className={classes.root} >
        <Box  className={classes.imageBg}>
          <LazyCardMedia
            className={classes.imageProduct}
            alt="beautiful make-up product"
            image={image_link}
            height={162}
          />
        </Box>
        <Box  className={classes.textAndIcon}>
          <Typography  className={classes.brandName} variant="h4" component="h2">
            {brand}
          </Typography>
          <FavoriteButton
            className={classes.favoriteIcon}
            isFavorited={getCurrentFavoriteItem}
            onClick={handleFavoriteButton}
          />
        </Box>
        <Typography className={classes.productName} variant="h5" component="h3">
          {name}
        </Typography>
        <Typography gutterBottom className={classes.productType} variant="subtitle1" component="h4">
          {product_type}
        </Typography>
        <Typography paragraph className={classes.productDescription} variant="body2" component="p">
          {description}
        </Typography>
        <Box className={classes.textAndIcon}>
          <Typography className={classes.price} variant="h5" component="h6">
            {price_sign}{price}
          </Typography>
          <CartButton
            added={getCurrentCartItem}
            onClick={handleCartButton}
          />
        </Box>
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
