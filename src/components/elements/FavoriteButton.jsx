import React from "react";

import PropTypes from 'prop-types';

// import MUI components
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/FavoriteSharp";

const FavoriteButton = ({ isFavorited, onClick }) => {

  return (
    <IconButton
      aria-label={ isFavorited ? "Remove From Favorite" : "Add to Favorite" }
      onClick={onClick}
    >
      <FavoriteIcon color={ isFavorited ? "error" : "disabled" } />
    </IconButton>
  )
};

export default React.memo(FavoriteButton);

FavoriteButton.propTypes = {
  isFavorited: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
}
