import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

// import Mui components
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from "@material-ui/core/ButtonGroup";

// import elements
import { useHandlerButton } from '../elements/customHooks';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
    boxPriceAndBtn: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
    justifyContent: "space-between",
    alignItems: "flex-start",
    [theme.breakpoints.down('xs')]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 0,
    },
  },
  productPrice: {
    color: theme.palette.pricingColor.main,
    fontSize: "1.2rem",
  },
}));

const CartCardButton = ({ product }) => {

  const classes = useStyles();

  //destructuring object
  const {id, price_sign} = product;

  //destructure custom hook
  const {getCurrentCartItem, addQuantity, removeQuantity} = useHandlerButton(id);

  const handleAddSingleQuantity = () =>  {
    addQuantity(product);
  };

  const handleRemoveSingleQuantity = () => {
    removeQuantity(product);
  };

  return(
    <React.Fragment>
      {getCurrentCartItem.id === id && (
        <Box className={classes.boxPriceAndBtn} key={id}>
          <Typography className={classes.productPrice} variant="h6" component="h6" >
            {price_sign}{getCurrentCartItem.price}
          </Typography>
          <CardActions  >
            <ButtonGroup aria-label="small outlined button group" >
              <Button
                onClick={handleAddSingleQuantity}
              >
              +
              </Button>
              <Button >
                {getCurrentCartItem.quantity}
              </Button>
              <Button
                onClick={handleRemoveSingleQuantity}
              >
              -
              </Button>
            </ButtonGroup>
          </CardActions>
        </Box>
      )}
    </React.Fragment>
  )
}

export default React.memo(CartCardButton);

CartCardButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    price_sign: PropTypes.string.isRequired,
  })
}
