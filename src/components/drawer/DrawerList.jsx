import React, { useState, useEffect } from 'react';

import { Link , useLocation } from "react-router-dom";

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

// MUI utility for constructing className
import clsx from 'clsx';

// import MUI components
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from  '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';

import {
  Lipstick,
  Blush,
  Eyeliner,
  Mascara,
} from '../elements/CustomIcons';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    fontWeight: 400,
    width: 222,
  },
  fullList: {
    width: 'auto',
  },
  listToolbar: {
    height: 94,
  },
  listItem: {
   "& .MuiListItemIcon-root": {
     minWidth: 30,
   },
  },
  listHeader: {
    padding: theme.spacing(2.5, 0, 2.5, 2),
    fontSize: "1.1rem",
  },
  listItemText: {
   fontSize: "0.9rem",
  },
  homeIcon: {
    color: theme.palette.primary.main,
    fontSize: "1.1rem",
  },
  customListIcon: {
    "& .MuiSvgIcon-root": {
      fontSize: "1.25em",
    }

  },
}));

const  DrawerList = ({anchor, closeDrawerCallback}) => {

  const classes = useStyles();

  const location = useLocation();

  // navigation categories path
  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (event, index) => {
     setSelectedIndex(index);
  };

  // return category selected on reload page based on url
  useEffect(() => {
    let path = location.pathname;
    path === "/" && setSelectedIndex(0);
    path === "/products/lipstick" && setSelectedIndex(1);
    path === "/products/blush" && setSelectedIndex(2);
    path === "/products/eyeliner" && setSelectedIndex(3);
    path === "/products/mascara" && setSelectedIndex(4);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // not need depencies because it needed to run only once on reload page

  return(
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'left',
      })}
      role="navigation"
      // close drawer when a category is selected by clicking the overlay or pressing the Esc key
      onClick={closeDrawerCallback}
      onKeyDown={closeDrawerCallback}
    >
    {/* hidden toolbar when breakpoint reach 960px*/}
      <Hidden smDown >
        <Toolbar className={classes.listToolbar}/>
      </Hidden>
      <Divider />
      <Typography variant="h6" component="h2" className={classes.listHeader}>
        categories
      </Typography>
      <Divider />
      <List disablePadding className={classes.root} component="nav" aria-label="main categories filters">
          <ListItem
           className={classes.listItem}
           button
           index={0}
           selected={selectedIndex === 0}
           component={Link} to='/'
           onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon >
            <HomeIcon className={classes.homeIcon} />
          </ListItemIcon>
          <ListItemText disableTypography className={classes.listItemText} primary="home"  />
        </ListItem>
        <ListItem
          className={classes.listItem}
          button
          selected={selectedIndex === 1}
          component={Link} to='/products/lipstick'
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon className={classes.customListIcon} >
            <Lipstick/>
          </ListItemIcon>
          <ListItemText disableTypography className={classes.listItemText} primary="lipstick"  />
        </ListItem>
        <ListItem
          className={classes.listItem}
          button
          selected={selectedIndex === 2}
          component={Link} to='/products/blush'
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon  className={classes.customListIcon} >
            <Blush/>
          </ListItemIcon>
          <ListItemText disableTypography className={classes.listItemText} primary="blush"  />
        </ListItem>
        <ListItem
          className={classes.listItem}
          button
          selected={selectedIndex === 3}
          component={Link} to='/products/eyeliner'
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon className={classes.customListIcon} >
            <Eyeliner/>
          </ListItemIcon>
          <ListItemText disableTypography className={classes.listItemText} primary="eyeliner"  />
        </ListItem>
        <ListItem
          className={classes.listItem}
          button
          selected={selectedIndex === 4}
          component={Link} to='/products/mascara'
          onClick={(event) => handleListItemClick(event,4)}
        >
          <ListItemIcon className={classes.customListIcon} >
            <Mascara/>
          </ListItemIcon>
          <ListItemText disableTypography className={classes.listItemText} primary="mascara"  />
        </ListItem>
      </List>
    </div>
  );
}

export default DrawerList;

DrawerList.propTypes = {
  anchor: PropTypes.string.isRequired,
  closeDrawerCallback: PropTypes.func.isRequired,
}
