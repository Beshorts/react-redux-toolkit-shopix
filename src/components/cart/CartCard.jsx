import React from 'react';

import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

// import Mui components
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//import MUI transitions
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';

//import components
import CardCartButton from './CartCardButton';

//import elements
import LazyCardMedia from '../elements/LazyCardMedia';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  rootCard: {
    display: 'flex',
    justifyContent: "space-between",
    marginBottom: 12,
    [theme.breakpoints.down('xs')]: {
      flexDirection: "column",
    },
  },
  boxRoot: {
    display: "inline-flex",
  },
  media: {
    marginLeft: theme.spacing(1),
    margin: "auto",
    width: 100,
    backgroundSize: "cover",
  },
  content: {
    flexGrow: 1,
    color: theme.palette.texts.main,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 344,
    padding: 16,
    "&:last-child": {
      paddingBottom: 16,
    },
    [theme.breakpoints.down('xs')]: {
      width: 211,
    },
  },
  brandProduct: {
   fontWeight: 700,
   //fontSize: "1rem",
  },
  nameProduct: {
   fontSize: "1rem",
   fontWeight: 500,
  },
  productInfoType: {
    opacity: 0.8,
    fontWeight: 700,
  },
  btnDetails: {
    padding: 0,
    textTransform: "lowercase",
  },
  btnDetailslabel: {
    justifyContent: "flex-start",
    "&:hover": {
     color: "grey",
    },
  },
}));

const CartCard = ({ product }) => {
  console.log('cart card')

  const classes = useStyles();

  // destructuring object
  const {id, image_link, brand, name, product_type} = product;

  return(
    <React.Fragment>
      <Slide direction="up" in={true} timeout={500} mountOnEnter unmountOnExit >
            <Box>
              <Fade in={true} timeout={800}>
                <Card className={classes.rootCard}>
                  <Box className={classes.boxRoot} >
                    <LazyCardMedia
                      className={classes.media}
                      image={image_link}
                      alt="Make Up product"
                      height={100}
                    />
                    <CardContent className={classes.content}>
                      <Typography className={classes.brandProduct} variant="h6" component="h4" >
                        {brand}
                      </Typography>
                      <Typography className={classes.nameProduct} noWrap variant="h6" component="h5">
                        {name}
                      </Typography>
                      <Typography className={classes.productInfoType} gutterBottom noWrap variant="subtitle2" component="h6" >
                        {product_type}
                      </Typography>
                      <CardActions className={classes.btnDetails} >
                        <Button
                          classes={{
                             root: classes.btnDetails,
                             label: classes.btnDetailslabel
                          }}
                          color="primary"
                          component={Link} to={`/product/${id}`}
                          key={id}
                        >
                          see details
                        </Button>
                      </CardActions>
                    </CardContent>
                    </Box>
                  <CardCartButton product={product} />
                </Card>
              </Fade>
            </Box>
          </Slide>
    </React.Fragment>
    )
}

export default React.memo(CartCard);

CartCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    brand: PropTypes.string.isRequired,
    image_link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    product_type: PropTypes.string.isRequired,
  })
}
