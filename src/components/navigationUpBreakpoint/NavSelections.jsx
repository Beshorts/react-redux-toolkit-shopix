import React, {lazy} from 'react';

import { makeStyles } from '@material-ui/core/styles';

// Mui components
import Hidden from '@material-ui/core/Hidden';

import ChipNavigation from './ChipNavigation';
import CategoriesMenuListPopover from './CategoriesMenuListPopover';

// Mui lazy component
const Breadcrumbs = lazy(() => import('@material-ui/core/Breadcrumbs'));
const ExpandMoreIcon = lazy(() => import('@material-ui/icons/ExpandMore'));
const HomeIcon = lazy(() => import('@material-ui/icons/Home'));

// style component
const useStyles = makeStyles((theme) => ({
  root: {
   margin: theme.spacing(15, 0, 0, 2),
  },
}));

const NavSelections = () => {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  // open menu categories
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // close menu categories
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Hidden smDown>
      <div className={classes.root}>
        <Breadcrumbs separator=">" aria-label="breadcrumb" role="navigation">
          <ChipNavigation
            color="secondary"
            component="a"
            href="/"
            icon={<HomeIcon fontSize="small" />}
            label="Home"
            onClose={handleClose}
          />
          <ChipNavigation  label="Products" href="#" />
          <ChipNavigation
            color="secondary"
            label="Categories"
            //Override the default delete icon element. Shown only if onDelete is set
            deleteIcon={<ExpandMoreIcon />}
            onClick={handleClick}
            onDelete={handleClick}
          />
          <CategoriesMenuListPopover
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)} />
        </Breadcrumbs>
      </div>
    </Hidden>
  );
}

export default NavSelections;
