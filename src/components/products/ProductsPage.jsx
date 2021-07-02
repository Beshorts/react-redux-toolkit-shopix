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

// import  component
import AutoSizerGrids from '../virtualizedGrids/AutoSizerGrids';

// import elements
import Error from '../elements/errors/Error';
import SkeletonCardGrid from '../elements/SkeletonCardGrid';

// import component as lazy
const NavSelections = lazy(() => import('../navigationUpBreakpoint/NavSelections'));

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  autoSizerContainer: {
   height: "100vh",
   [theme.breakpoints.up('md')]: {
     maxWidth: 769,
   },
   [theme.breakpoints.up('lg')]: {
    maxWidth: 1092,
   },
   [theme.breakpoints.up('xl')]: {
     maxWidth: 1600,
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
    <Container className={classes.autoSizerContainer} >
      <Suspense fallback={<div/>}>
       <NavSelections />
      </Suspense>
      { isProductsLoaded
        ? <AutoSizerGrids />
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


