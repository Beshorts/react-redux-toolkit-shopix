import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

// import Mui components
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
// import elements
import { useQuantityCounter } from '../elements/customHooks';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
    root: {
     display: "flex",
     padding: "0px 16px 16px 16px",
     [theme.breakpoints.up('xs')]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 0,
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-end",
      padding: "16px 22px 16px 16px",
    },
  },
  productPrice: {
    color: theme.palette.pricingColor.main,
    fontSize: "0.9rem",
    fontWeight: 500,
  },
  btnActions: {
    padding: 0,
  },
    btnRoot: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 8,
    minWidth: 0,
    padding: 2,
      backgroundColor: "#ff6000",
    "&:hover": {
    backgroundColor: "#94778B",
    },
  },
  addBtn: {
    color: "#FFFF",
    fontSize: "1.1rem",
  },
  quantityText: {
    minWidth: 0,
  },
  removeBtn: {
    color: "#FFFF",
    fontSize: "1.1rem",
  },
}));

const CartCardButton = ({ product }) => {

  const classes = useStyles();

  //destructuring object
  const {id, price_sign} = product;

  //destructure custom hook
  const { getCurrentCartItem, addQuantity, removeQuantity } = useQuantityCounter(id);

  const handleAddSingleQuantity = () =>  {
    addQuantity(product);
  };

  const handleRemoveSingleQuantity = () => {
    removeQuantity(product);
  };

  return(
    <React.Fragment>
      {getCurrentCartItem.id === id && (
        <Box className={classes.root} key={id}>
              <Typography className={classes.productPrice} variant="h6" component="h6" >
            {price_sign}{getCurrentCartItem.price}
          </Typography>
          <CardActions className={classes.btnActions}  >
            <Box aria-label="small button group" >
              <Button
                className={classes.btnRoot}
                size="small"
                aria-label="add"
                variant="contained"
                onClick={handleAddSingleQuantity}
              >
              <AddIcon className={classes.addBtn} />
              </Button>
              <Button className={classes.quantityText} >
                {getCurrentCartItem.quantity}
              </Button>
              <Button
                className={classes.btnRoot}
                size="small"
                aria-label="remove"
                variant="contained"
                onClick={handleRemoveSingleQuantity}
              >
              <RemoveIcon className={classes.removeBtn} />
              </Button>
            </Box>
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
