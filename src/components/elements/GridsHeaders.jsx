import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

// Mui components
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// import element
import Emoji from '../elements/Emoji';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(1, 0, 0, 2),
    marginBottom: theme.spacing(1.2),
  },
  gridHeaderText: {
    color: theme.palette.primary.main,
    fontSize: "0.9rem",
    fontWeight: 500,
    marginRight: theme.spacing(0.75),
  },
    gridHeaderSubtitle: {
    color: theme.palette.grey.main,
    fontSize: "0.75rem",
    fontWeight: 700,
    margin: theme.spacing(0.375, 0, 0, 0.25),
  },
}));


const GridsHeaders = ({data, title,text, symbol, label}) => {

  const classes = useStyles();

  return(
    <Box className={classes.root} >
      <Typography className={classes.gridHeaderText} variant="subtitle1" component="h1">
        {title}
      </Typography>
      <Emoji symbol={symbol} label={label} />
      <Typography className={classes.gridHeaderSubtitle} variant="subtitle2" component="h2">
        {data.length ? data.length : data}
      </Typography>
      <Typography className={classes.gridHeaderSubtitle} variant="subtitle2" component="h2">
        {text}
      </Typography>
    </Box>
  )
};

export default GridsHeaders;

GridsHeaders.propTypes = {
  data: PropTypes.any,
  title: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}
