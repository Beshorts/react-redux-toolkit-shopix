import React from 'react';

import PropTypes from 'prop-types';

// for custom Mui styles
import { makeStyles } from '@material-ui/core/styles';

// import MUI components
import Button from "@material-ui/core/Button";

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomRightRadius:8,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 8,
    minWidth: 0,
    padding: 2,
    "&:hover": {
      backgroundColor: "#71A215",
    },
  },
  addBtn: {
    color: "#FFFF",
    fontSize: "1.1rem",
  },
  removeBtn: {
    color: "#FFFF",
    fontSize: "1.1rem",
  },
}));


const CartButton = ({ added, onClick }) => {
  const classes = useStyles();

  return(
     <Button onClick={onClick}
     variant="contained"
     className={classes.root}
     aria-label={ added ? "remove" : "add" }
     style={{backgroundColor: added ? "#94778B" : "#67B99A"}}
      >
      {added ? <RemoveIcon className={classes.removeBtn}  color="secondary"  /> : <AddIcon className={classes.addBtn}/>}
    </Button>


  )
};

export default React.memo(CartButton);

CartButton.propTypes = {
  added: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
}

