import React from "react";

import PropTypes from 'prop-types';

// for custom Mui styles
import { makeStyles } from '@material-ui/core/styles';

// import MUI components
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/FavoriteSharp";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
   favoriteIcon: {
    fontSize: "1.2rem",
  },
  favoriteIconOutlined: {
    fontSize: "1.2rem",
  }
}));
const FavoriteButton = ({ isFavorited, onClick }) => {
  const classes = useStyles();
  return (
    <IconButton
      aria-label={ isFavorited ? "Remove From Favorite" : "Add to Favorite" }
      onClick={onClick}
    >
     { isFavorited ? <FavoriteIcon className={classes.favoriteIcon} color="error" /> : <FavoriteBorderOutlinedIcon className={classes.favoriteIconOutlined} color="error" /> }
    </IconButton>
  )
};

export default React.memo(FavoriteButton);

FavoriteButton.propTypes = {
  isFavorited: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
}
