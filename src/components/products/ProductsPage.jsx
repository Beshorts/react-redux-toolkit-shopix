import React, {useEffect} from 'react';

import {useParams} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'

// redux  actions
import { getProducts } from '../../features/productsAPI/productsAPISlice';
import { getFilterBy } from '../../features/filters/filtersSlice';

// redux Selector
import { productsSelected } from '../../selectors/filters';

import { makeStyles } from '@material-ui/core/styles';
// Mui components
import Container from '@material-ui/core/Container';

// import components
import ProductsGrid from './ProductsGrid';

// import elements
import SkeletonCardGrid from '../elements/SkeletonCardGrid';

// rules for custom components style
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    [theme.breakpoints.up('lg')]: {
     maxWidth: 1000,
     marginLeft: 'calc(40% - 250px)',
    },
    [theme.breakpoints.up('xl')]: {
     maxWidth: 1280,
     marginLeft: 'calc(40% - 380px)',
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

  // memoize selector to get products filtered by param
  const filteredByCategory = useSelector(productsSelected);

  // state of products filtered by category
  const productsFiltered = useSelector(state => state.products.productsFiltered);

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
    <React.Fragment>
      <Container className={classes.root} >
        { isProductsLoaded ?
          <ProductsGrid productsFiltered={productsFiltered} />
          : error
          ? error // errors page needs to be implemented
          : <SkeletonCardGrid />
        }
      </Container>
    </React.Fragment>
  )
};

export default ProductsPage;


