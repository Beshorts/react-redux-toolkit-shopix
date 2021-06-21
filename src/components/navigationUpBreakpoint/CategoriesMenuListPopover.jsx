import React from 'react';

import { Link , useLocation } from "react-router-dom";

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

// Mui components
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// import elements
import {
  Lipstick,
  Blush,
  Eyeliner,
  Mascara,
} from '../elements/CustomIcons';

// style custom menu
const StyledMenu = withStyles({
  paper: {
   border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const CategoriesMenuListPopover = ({anchorEl,open, onClose}) => {

  const location = useLocation();

  const [selectedIndex, setSelectedIndex] = React.useState();

  // return category selected on reload page based on url
  React.useEffect(() => {
    let path = location.pathname;
    path === "/products/lipstick" && setSelectedIndex(0);
    path === "/products/blush" && setSelectedIndex(1);
    path === "/products/eyeliner" && setSelectedIndex(2);
    path === "/products/mascara" && setSelectedIndex(3);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // not need depencies because it needed to run only once on reload page


  // handle click on selected category
  const handleListItemClick = (event, index) => {
     setSelectedIndex(index);
  };

  return(
    <StyledMenu
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClick={onClose}
      onKeyDown={onClose}
    >
      <MenuItem
        selected={selectedIndex === 0}
        component={Link} to='/products/lipstick'
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemIcon >
          <Lipstick />
        </ListItemIcon>
        <ListItemText disableTypography primary="lipstick"  />
      </MenuItem>
      <MenuItem
        selected={selectedIndex === 1}
        component={Link} to='/products/blush'
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon  >
          <Blush />
        </ListItemIcon>
        <ListItemText disableTypography primary="blush"  />
      </MenuItem>
      <MenuItem
        selected={selectedIndex === 2}
        component={Link} to='/products/eyeliner'
        onClick={(event) => handleListItemClick(event, 2)}
      >
        <ListItemIcon >
          <Eyeliner />
        </ListItemIcon>
        <ListItemText disableTypography primary="eyeliner"  />
      </MenuItem>
      <MenuItem
        selected={selectedIndex === 3}
        component={Link} to='/products/mascara'
        onClick={(event) => handleListItemClick(event,3)}
      >
        <ListItemIcon >
          <Mascara />
        </ListItemIcon>
        <ListItemText disableTypography primary="mascara"  />
      </MenuItem>
    </StyledMenu>
  );
}

export default CategoriesMenuListPopover;

CategoriesMenuListPopover.propTypes = {
  anchorEl: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
