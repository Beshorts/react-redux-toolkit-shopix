import React, {Suspense, lazy} from 'react';

import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

// import custom Skeleton style
import {SkeletonWrapper} from './styles';

import { makeStyles } from '@material-ui/core/styles';

// import Mui component
import Skeleton from '@material-ui/lab/Skeleton';

// import MUI components as lazy load
const Card = lazy(() => import('@material-ui/core/Card'));
const CardActionArea = lazy(() => import('@material-ui/core/CardActionArea'));

// import elements as lazy load
const LazyCardMedia = lazy(() => import('../elements/LazyCardMedia'));


// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
   maxWidth: 150,
   color: theme.palette.primary.main,
   margin: theme.spacing(0, "auto"),
   "& .MuiCardMedia-img": {
    objectFit: "contain",
    padding: theme.spacing(1.25, 0, 1.25, 0),
    transition: "all .2s ease-in-out",
    "&:hover": {
     transform: "scale(1.08)",
    },
   },
  },
}));

const BestPricesCard = ({ columnIndex, rowIndex, style, data }) => {

  const classes = useStyles();

  // destructure data
  const { value, columnCount } = data;

  // create an index up to 11
  const singleColumnIndex = columnIndex + rowIndex * columnCount;

  /* create single card objects from array up to singleColumn result,
   when user scroll the grid recreate them with new objects from the array */
  const bestPricesCard = value[singleColumnIndex];

  // destructure object
  const { id, image_link } = bestPricesCard;

  const cellContainerStyle = {
    width: "100%",
    height: "100%",
    display: "inline-block",
  };

  return(
    <div style={style} className="cellContainer">
      {bestPricesCard && (
        <div
          className="cell"
          id={id}
          style={cellContainerStyle}
        >
        <Suspense fallback={
          <SkeletonWrapper>
            <Skeleton variant="rect" height={120} width={130} />
          </SkeletonWrapper>
        }>
          <Card elevation={3} className={classes.root} key={id} >
            <CardActionArea
              component={Link} to={`/product/${id}`}
            >
            <LazyCardMedia
              alt="beautiful make-up product"
              image={image_link}
              height={120}
            />
            </CardActionArea>
          </Card>
        </Suspense>
     </div>
     )
    }
   </div>
  )
};

export default BestPricesCard;

BestPricesCard.propTypes = {
  columnIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  bestPricesCard: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    image_link: PropTypes.string.isRequired,
  })
}
