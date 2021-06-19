import React from "react";

import PropTypes from 'prop-types';

// for custom Mui styles
import { makeStyles } from '@material-ui/core/styles';

// import MUI components
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/FavoriteSharp";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "fit-content",
    borderRadius: 16,
  },
   favoriteIcon: {
    fontSize: "1.2rem",
    color: theme.palette.error.main,
  },
  favoriteIconOutlined: {
    fontSize: "1.2rem",
    color: theme.palette.error.main,
  }
}));
const FavoriteButton = ({ isFavorited, onClick }) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.root}
      aria-label={ isFavorited ? "Remove From Favorite" : "Add to Favorite" }
      onClick={onClick}
    >
     { isFavorited
       ? <FavoriteIcon className={classes.favoriteIcon}  />
       : <FavoriteBorderOutlinedIcon className={classes.favoriteIconOutlined} />
     }
    </Button>
  )
};

export default React.memo(FavoriteButton);

FavoriteButton.propTypes = {
  isFavorited: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onClick: PropTypes.func.isRequired,
}
