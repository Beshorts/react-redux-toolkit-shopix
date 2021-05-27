import React, {useState, useEffect} from 'react';

import {Link , useLocation} from "react-router-dom";

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { useMediaQuery } from "@material-ui/core";

// MUI utility for constructing className
import clsx from 'clsx';

// import MUI components
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from  '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// import elements
import {
  Lipstick,
  Blush,
  Eyeliner,
  Mascara,
} from '../elements/CustomIcons';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.texts.main,
    fontWeight: 500,
    width: 188,
  },
  fullList: {
    width: 'auto',
  },
  drawerToolbar: {
    height: 94,
  },
  listHeader: {
    padding: "20px 0 20px 20px",
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
    }
  },
}));

const  DrawerCategories = ({mobileOpen, closeDrawerCallback}) => {
  console.count('drawer');

  const classes = useStyles();

  const location = useLocation();

  // navigation categories path
  const [selectedIndex, setSelectedIndex] = useState();


/* switch drawer variant from temporary to permanent on desktop size (lg and up)
     useMediaQuery automatically provides useTheme() as an argument */
  const isLargeScreen = useMediaQuery(theme => theme.breakpoints.up("lg"));

  // return the right category selected on reload page based on url
  useEffect(() => {
    console.count('pathname')
    let path = location.pathname;
    if (path === "/products/lipstick" && selectedIndex !== 0) setSelectedIndex(0);
    else if (path === "/products/blush" && selectedIndex !== 1) setSelectedIndex(1);
    else if (path === "/products/eyeliner" && selectedIndex !== 2) setSelectedIndex(2);
    else if (path === "/products/mascara" && selectedIndex !== 3) setSelectedIndex(3);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // not need depencies because it needed to run only once on reload page

  const handleListItemClick = (event, index) => {
    const anchor = document.querySelector(".grid");
    anchor.scrollTo(0,0);
    setSelectedIndex(index);
  };


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'left',
      })}
      role="navigation"
      // close drawer when a category is selected by clicking the overlay or pressing the Esc key
      onClick={closeDrawerCallback}
      onKeyDown={closeDrawerCallback}
    >
      <List disablePadding className={classes.root} component="nav" aria-label="main categories filters">
        {/* hidden toolbar when breakpoint reach 960px*/}
        <Hidden mdDown >
          <Toolbar className={classes.drawerToolbar}/>
        </Hidden>
        <Divider />
        <Typography variant="h6" component="h2" className={classes.listHeader}>
          categories
        </Typography>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 0}
          component={Link} to='/products/lipstick'
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon >
            <Lipstick/>
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="lipstick"  />
        </ListItem>
        <ListItem
          className={classes.listItem}
          button
          selected={selectedIndex === 1}
          component={Link} to='/products/blush'
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <Blush/>
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="blush"  />
        </ListItem>
        <ListItem
          className={classes.listItem}
          button
          selected={selectedIndex === 2}
          component={Link} to='/products/eyeliner'
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <Eyeliner/>
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="eyeliner"  />
        </ListItem>
        <ListItem
          className={classes.listItem}
          button
          selected={selectedIndex === 3}
          component={Link} to='/products/mascara'
          onClick={(event) => handleListItemClick(event,3)}
        >
          <ListItemIcon>
            <Mascara/>
          </ListItemIcon>
          <ListItemText className={classes.listItemText} primary="mascara"  />
        </ListItem>
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <Drawer
        PaperProps={{ elevation: 6 }}
        className={classes.drawer}
        variant={isLargeScreen ? 'permanent' : 'temporary'}
        anchor={'left'}
        open={mobileOpen}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        onClose={closeDrawerCallback}
      >
        { list('left') }
      </Drawer>
    </React.Fragment>
  );
};

export default DrawerCategories;

DrawerCategories.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  closeDrawerCallback: PropTypes.func.isRequired,
}
