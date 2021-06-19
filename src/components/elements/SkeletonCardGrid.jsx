import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  skeletonGridContainer: {
    paddingTop: theme.spacing(9),
  },
  skeletonCard: {
    margin: theme.spacing(0,"auto"),
    marginBottom: theme.spacing(2),
    maxWidth: 150,
  },
}));

const SkeletonCardGrid = () => {

  const classes = useStyles();

  return(
    <Grid container  className={classes.skeletonGridContainer} >
      { Array.from(new Array(24)).map( (elem, index) => (
      <Grid  item xs={6} sm={3} md={3} lg={2} xl={2} key={index} >
        <Box className={classes.skeletonCard} key={index} >
          <Skeleton variant="rect" height={166} />
          <Skeleton variant="text" width="72%" height={10}  />
          <Skeleton variant="text" width="30%" height={10} />
        </Box>
      </Grid>
     ))}
    </Grid>
  )
};

export default SkeletonCardGrid;
