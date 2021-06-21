import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';

// import MUI components
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';

// import components
import CategoriesMenuListPopover from './CategoriesMenuListPopover';
import ChipNavigation from './ChipNavigation';

// style component
const useStyles = makeStyles((theme) => ({
  root: {
   marginTop: theme.spacing(15),
   paddingLeft: theme.spacing(2),
  },
  iconChip: {
   color: "white",
   fontSize: "1.1rem",
  },
}));

const NavSelections = () => {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  // open menu categories
  const handleMenuCategories = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // close menu categories
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
            <Hidden smDown>

    <Breadcrumbs className={classes.root} separator=">" aria-label="navigation">
      <ChipNavigation
        component="a"
        href="#"
        label="Home"
        icon={<HomeIcon className={classes.iconChip} fontSize="small" />}
      />
      <ChipNavigation component="a" href="#" label="Products" />
      <ChipNavigation
        label="Categories"
        component="a"
        deleteIcon={<ExpandMoreIcon className={classes.iconChip} />}
        onClick={handleMenuCategories}
        onDelete={handleMenuCategories}
      />
      <CategoriesMenuListPopover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      />
    </Breadcrumbs>
    </Hidden>
  );
}

export default NavSelections;
