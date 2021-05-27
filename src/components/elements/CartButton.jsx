import React from 'react';

import PropTypes from 'prop-types';

// for custom Mui styles
import { makeStyles } from '@material-ui/core/styles';

// import MUI components
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  btnAddToCart: {
    background: 'linear-gradient(274deg, rgba(64,86,244,1) 0%, rgba(15,189,250,1) 100%)',
    borderRadius: 16,
    fontSize: "0.8rem",
    color: "#FFF",
    fontWeight: 700,
  },
  btnRemoveFromCart: {
    background: 'linear-gradient(94deg, rgba(215,71,128,1) 0%, rgba(213,0,224,1) 100%)',
    borderRadius: 16,
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "#FFF",
  },
}));

const CartButton = ({ added, onClick }) => {

  const classes = useStyles();
  return(
    <Button
      className={added ? `${classes.btnRemoveFromCart}` : `${classes.btnAddToCart}` }
      disableElevation
      variant="contained"
      startIcon={ added ?  <RemoveCircleIcon  /> : <AddShoppingCartIcon /> }
      aria-label={ added ? "remove" : "add" }
      onClick={ onClick }
    >
      { added ? "remove" : "add" }
    </Button>

  )
};

export default React.memo(CartButton);

CartButton.propTypes = {
  added: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
}

