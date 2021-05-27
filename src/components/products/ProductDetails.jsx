import React from 'react';

import { useParams } from "react-router-dom";

import { useSelector } from 'react-redux';

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
import { useHandlerButton } from '../elements/customHooks';


// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.texts.main,
     [theme.breakpoints.up('lg')]: {
     maxWidth: 1000,
     marginLeft: 318,
    },
    [theme.breakpoints.up('xl')]: {
     maxWidth: 1280,
     marginLeft: 420,
    },
  },
  imageBg: {
    backgroundColor: "#FFF",
    marginTop: 90,
    paddingTop: 30,
    paddingBottom: 30,
    display: "grid",
  },
  imageProduct: {
    margin: "auto",
    width: 200,
  },
  textAndIcon: {
    width: "100%",
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
  },
  brandName: {
    fontWeight: 700,
    fontSize: "1.2rem",
  },
  productName: {
    fontWeight: 700,
  },
  productType: {
    fontWeight: 700,
    opacity: 0.8,
  },
  productDescription: {
    fontWeight: 500,
    fontSize: "0.9rem",
    lineHeight: 1.6,
  },
  price: {
    color: theme.palette.pricingColor.main,
    fontSize: "1.3rem",
  },
}));


const ProductDetails = () => {
  console.log("single product page")

  const classes = useStyles();

  // get clicked id
  let { productId } = useParams();

  // get the product object
  const singleProduct = useSelector(state => selectProductById(state, productId));

  // destructuring object
  const {image_link, brand, id, name, product_type, description, price_sign, price} = singleProduct;

  //destructure custom hook
  const { cartItem, cart, favoriteItem, favorite} = useHandlerButton(id);

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