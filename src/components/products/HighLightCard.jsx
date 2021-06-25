import React, {Suspense, lazy} from 'react';

import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

// import custom Skeleton style
import {SkeletonWrapper} from './styles';

import { makeStyles } from '@material-ui/core/styles';

// import Mui component
import Skeleton from '@material-ui/lab/Skeleton';

// import elements
import { useAddRemoveFavorite } from '../elements/customHooks';

// import MUI components as lazy load
const Card = lazy(() => import('@material-ui/core/Card'));
const CardHeader = lazy(() => import('@material-ui/core/CardHeader'));
const CardActionArea = lazy(() => import('@material-ui/core/CardActionArea'));
const CardContent = lazy(() => import('@material-ui/core/CardContent'));
const Typography = lazy(() => import('@material-ui/core/Typography'));

// import elements as lazy load
const FavoriteButton = lazy(() => import('../elements/FavoriteButton'));
const LazyCardMedia = lazy(() => import('../elements/LazyCardMedia'));


// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 150,
    color: theme.palette.primary.main,
    textAlign: "center",
    margin: theme.spacing(0, "auto"),
    "& .MuiCardHeader-root": {
     padding: theme.spacing(1.25, 2, 0, 2),
    },
    "& .MuiCardMedia-img": {
     objectFit: "contain",
    },
    "& .MuiCardContent-root:last-child": {
     padding: theme.spacing(2)
    },
  },
  nameProduct: {
   fontSize: "0.9rem",
   fontWeight: 400,
  },
}));

const HighLightCard = ({ columnIndex, rowIndex, style, data}) => {

  const classes = useStyles();

  // destructure data
  const { value, columnCount } = data;

  // create an index up to 11
  const singleColumnIndex = columnIndex + rowIndex * columnCount;

  /* create single card objects from array up to singleColumn result,
   when user scroll the grid recreate them with new objects from the array */
  const highLightCard = value[singleColumnIndex];

  // check if card exist and retrieve its id
  const checkId = highLightCard ? highLightCard.id : null;

  // destructure custom hook
  const { getCurrentFavoriteItem, favorite } = useAddRemoveFavorite(checkId);

  // destructure obbject
  const {id, image_link, product_type} = highLightCard;

  const handleFavoriteButton = () => {
    favorite(highLightCard)
  };

  const cellContainerStyle = {
    width: "100%",
    height: "100%",
    display: "inline-block",
  };

  return(
    <div style={style} className="cellContainer">
      {highLightCard && (
      <div
      className="cell"
      id={id}
      style={cellContainerStyle}
      >
        <Suspense
          fallback={
             <SkeletonWrapper>
              <Skeleton variant="rect" height={120} width={150} style={{ marginBottom: 2 }} />
              <Skeleton variant="text" width="70%" height={10} />
              <Skeleton variant="text" width="30%" height={10} />
            </SkeletonWrapper>
          }>
          <Card elevation={3} className={classes.root} key={id} >
            <CardHeader
              action={
                <FavoriteButton
                  isFavorited={getCurrentFavoriteItem}
                  onClick={handleFavoriteButton}
                />
              }
            />
            <CardActionArea
              component={Link} to={`/product/${id}`}
            >
              <LazyCardMedia
                alt="beautiful make-up product"
                image={image_link}
                height={80}
              />
            </CardActionArea>
            <CardContent >
              <Typography className={classes.nameProduct} noWrap variant="h6" component="h1" >
                {product_type}
              </Typography>
            </CardContent>
          </Card>
        </Suspense>
     </div>
     )
    }
   </div>
  )
};

export default HighLightCard;

HighLightCard.propTypes = {
  columnIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  highLightCard: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    image_link: PropTypes.string.isRequired,
    product_type: PropTypes.string.isRequired,
  })
}
