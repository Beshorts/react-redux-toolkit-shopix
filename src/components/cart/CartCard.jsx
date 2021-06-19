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
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.up('xs')]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: "row",
    },
  },
  boxRoot: {
    display: "inline-flex",
  },
  media: {
    marginLeft: theme.spacing(1),
    margin: "auto",
    width: 62,
    backgroundSize: "cover",
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
    },
  },
  content: {
    flexGrow: 1,
    color: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2, 2, 0, 2),
    "&:last-child": {
     paddingBottom: theme.spacing(0),
    },
    [theme.breakpoints.up('xs')]: {
      width: 180,
    },
    [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
    "&:last-child": {
      paddingBottom: theme.spacing(2),
     },
    },
  },
  brandProduct: {
   color: theme.palette.primary.main,
   fontWeight: 500,
   fontSize: "1rem",
  },
  nameProduct: {
   fontSize: "0.9rem",
   fontWeight: 400,
  },
  productInfoType: {
    color: theme.palette.primary.main,
    fontSize: "0.9rem",
    fontWeight: 500,
  },
  btnDetails: {
    padding: theme.spacing(0),
    textTransform: "lowercase",
  },
  btnDetailslabel: {
    justifyContent: "flex-start",
    color: theme.palette.darkPurple.main,
    fontSize: "0.8rem",
    fontWeight: 500,
    "&:hover": {
     color: theme.palette.primary.main,
    },
  },
}));

const CartCard = ({ product }) => {

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
                  height={60}
                />
                <CardContent className={classes.content}>
                  <Typography className={classes.brandProduct} variant="h6" component="h4" >
                    {brand}
                  </Typography>
                  <Typography className={classes.nameProduct} noWrap variant="h6" component="h5">
                    {name}
                  </Typography>
                  <Typography className={classes.productInfoType} noWrap variant="subtitle2" component="h6" >
                    {product_type}
                  </Typography>
                  <CardActions className={classes.btnDetails} >
                    <Button
                      classes={{
                         root: classes.btnDetails,
                         label: classes.btnDetailslabel
                      }}
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
};

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
