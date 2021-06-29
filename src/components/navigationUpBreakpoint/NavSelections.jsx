<<<<<<< HEAD
import React, {useState, Suspense, lazy} from 'react';
=======
import React, {useState} from 'react';
>>>>>>> 8ba347b9add5f81f3be4519ab6ad19109fd8b9e0

import { makeStyles } from '@material-ui/core/styles';

// import MUI components
<<<<<<< HEAD
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Skeleton from '@material-ui/lab/Skeleton';

// import Mui lazy components
const Breadcrumbs = lazy(() => import('@material-ui/core/Breadcrumbs'));
const HomeIcon = lazy(() => import('@material-ui/icons/Home'));
const ExpandMoreIcon = lazy(() => import('@material-ui/icons/ExpandMore'));

// import custom lazy components
const CategoriesMenuListPopover = lazy(() => import('./CategoriesMenuListPopover'));
const ChipNavigation = lazy(() => import('./ChipNavigation'));

=======
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';

// import components
import CategoriesMenuListPopover from './CategoriesMenuListPopover';
import ChipNavigation from './ChipNavigation';
>>>>>>> 8ba347b9add5f81f3be4519ab6ad19109fd8b9e0

// style component
const useStyles = makeStyles((theme) => ({
  root: {
<<<<<<< HEAD
   padding: 0,
   marginTop: theme.spacing(15),
   [theme.breakpoints.up('xl')]: {
     margin: theme.spacing(15, 0, 0, 0),
   },
  },
  breadCrumbs: {
   paddingLeft: theme.spacing(2),
  '& .MuiChip-deleteIcon': {
   color: "white",
   fontSize: "1.1rem",
   '&:hover': {
    color: "white",
   }
  },
  '& .MuiChip-icon':{
    color: "white",
    fontSize: "1rem",
   }
=======
   paddingLeft: theme.spacing(2),
   marginTop: theme.spacing(15),
  },
  iconChip: {
   color: "white",
   fontSize: "1.1rem",
>>>>>>> 8ba347b9add5f81f3be4519ab6ad19109fd8b9e0
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
<<<<<<< HEAD
    <Hidden smDown>
      <Container  className={classes.root}>
        <Suspense fallback={ <Skeleton variant="rect" height={40} width={400}/> }>
          <Breadcrumbs className={classes.breadCrumbs} separator=">" aria-label="navigation">
            <ChipNavigation
              component="a"
              href="#"
              label="Home"
              icon={<HomeIcon fontSize="small" />}
            />
            <ChipNavigation component="a" href="#" label="Products" />
            <ChipNavigation
              label="Categories"
              component="a"
              deleteIcon={<ExpandMoreIcon />}
              onClick={handleMenuCategories}
              onDelete={handleMenuCategories}
            />
            <CategoriesMenuListPopover
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            />
          </Breadcrumbs>
        </Suspense>
      </Container>
=======
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
>>>>>>> 8ba347b9add5f81f3be4519ab6ad19109fd8b9e0
    </Hidden>
  );
}

export default NavSelections;
