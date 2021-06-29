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
   minWidth: 25,
   borderRadius: theme.spacing(1, 0, 1, 0),
   padding: theme.spacing(0.2),
  },
  addBtn: {
   color: "#FFFF",
   fontSize: "1.1rem",
  },
  removeBtn: {
   backgroundColor: theme.palette.darkPurple.main,
   color: "#FFFF",
   fontSize: "1.1rem",
  },
}));


const CartButton = ({ added, onClick }) => {
  const classes = useStyles();

const buttonStyle = {
  backgroundColor: added ? "#94778B" : "#67B99A"
}
  return(
     <Button
     className={classes.root}
     onClick={onClick}
     variant="contained"
     aria-label={ added ? "remove" : "add" }
     style={buttonStyle}
      >
      { added
        ? <RemoveIcon className={classes.removeBtn}   />
        : <AddIcon className={classes.addBtn}/>
      }
    </Button>


  )
};

export default React.memo(CartButton);

CartButton.propTypes = {
  added: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  onClick: PropTypes.func.isRequired,
}

