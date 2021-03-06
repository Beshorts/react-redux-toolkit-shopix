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
   padding: theme.spacing(0, 2, 2, 2),
   [theme.breakpoints.up('xs')]: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing(0),
   },
   [theme.breakpoints.up('sm')]: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: theme.spacing(2, 2.75, 2, 2),
   },
  },
  productPrice: {
    color: theme.palette.deepPrimary.main,
    fontSize: "0.9rem",
    fontWeight: 500,
  },
  btnActions: {
    padding: theme.spacing(0),
  },
  btnRoot: {
    minWidth: 0,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.spacing(1, 0, 1, 0),
    padding: theme.spacing(0.25),
    "&:hover": {
    backgroundColor: theme.palette.darkPurple.main,
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
