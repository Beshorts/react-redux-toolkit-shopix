import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  skeletonGridContainer: {
    paddingTop: theme.spacing(12.5),
  },
  skeletonCard: {
    margin: theme.spacing(0, 'auto'),
    maxWidth: 260,
  },
}));

const SkeletonCardGrid = () => {

  const classes = useStyles();

  return(
    <Grid container  className={classes.skeletonGridContainer} >
      { Array.from(new Array(12)).map( (elem, index) => (
      <Grid  item xs={12} sm={6} md={4} lg={4} xl={3} key={index} >
        <Box className={classes.skeletonCard} key={index} >
          <Skeleton variant="rect" height={250} />
          <Skeleton variant="text" width="72%" height={10}  />
          <Skeleton variant="text" width="30%" height={10} />
        </Box>
      </Grid>
     ))}
    </Grid>
  )
};

export default SkeletonCardGrid;
