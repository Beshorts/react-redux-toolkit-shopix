import React, { useEffect, Suspense, lazy } from 'react';

import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'

import PropTypes from 'prop-types';

// redux  actions
import { getProducts } from '../../features/productsAPI/productsAPISlice';
import { getFilterBy } from '../../features/filters/filtersSlice';

// redux Selector
import { productsSelected } from '../../selectors/filters';

import { makeStyles } from '@material-ui/core/styles';

// Mui components
import Container from '@material-ui/core/Container';
// import elements
import Error from '../elements/errors/Error';
import SkeletonCardGrid from '../elements/SkeletonCardGrid';

// import lazy component
const AutoSizerGrids = lazy(() => import('../virtualizedGrids/AutoSizerGrids'));

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    [theme.breakpoints.up('md')]: {
     maxWidth: 769,
     marginLeft: 'calc(40% - 180px)',
    },
    [theme.breakpoints.up('lg')]: {
     maxWidth: 1092,
     marginLeft: 'calc(40% - 302px)',
    },
    [theme.breakpoints.up('xl')]: {
     maxWidth: 1600,
     marginLeft: 'calc(40% - 500px)',
    },
  },
}));


const ProductsPage = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  // get category params of clicked tab
  const {category} = useParams();

  // fectProducts action status
  const isProductsLoaded = useSelector(state => state.products.status === "succeeded");

    // API error response
  const error = useSelector(state => state.products.error);

  // memoize selector to get products filtered by current param
  const filteredByCategory = useSelector(productsSelected);

  useEffect(() => {
    if (isProductsLoaded) {
      dispatch(getFilterBy(category));
     };
  },[isProductsLoaded, dispatch,category]);


  useEffect(() => {
     if (filteredByCategory.length !== 0) {
      dispatch(getProducts(filteredByCategory))
    };
  },[dispatch, filteredByCategory]);

  return(
    <Container className={classes.root} >
      { isProductsLoaded
        ? <Suspense fallback={<div/>} >
            <AutoSizerGrids />
          </Suspense>
        : error
        ? <Error />
        : <SkeletonCardGrid/>
      }
    </Container>
  )
};

export default ProductsPage;

ProductsPage.propTypes = {
  isProductsLoaded: PropTypes.string.isRequired,
}

ProductsPage.defaultProps = {
  isProductsLoaded: 'succeeded',
}


