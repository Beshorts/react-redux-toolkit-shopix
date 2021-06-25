import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  skeletonGridContainer: {
    paddingTop: theme.spacing(10),
  },
  skeletonCard: {
    maxWidth: "100%",
    margin: theme.spacing(0,"auto"),
    marginBottom: theme.spacing(6),
  },
}));

const SkeletonCardGrid = () => {

  const classes = useStyles();

  return(
    <Grid container  className={classes.skeletonGridContainer} >
      { Array.from(new Array(3)).map( (elem, index) => (
      <Grid  item xs={12} key={index} >
        <Box className={classes.skeletonCard} key={index} >
          <Skeleton variant="rect" height={140}  />
        </Box>
      </Grid>
     ))}
    </Grid>
  )
};

export default SkeletonCardGrid;
