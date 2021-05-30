import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import axios from 'axios';

const productsAdapter = createEntityAdapter({});

/* optional objects (status, error) as arguments will be merged into
   the returned initial state value to track status and error from API */
const initialState = productsAdapter.getInitialState({
  status: 'idle',
  error: null,
  productsFiltered: [],
});

/* for this project I choose to fetch NYX BRAND and retrieve only specific fields */
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // store API response in an new array
    const productFields = [];
    const api_key = process.env.REACT_APP_RAPIDAPI_KEY;

    try {
      const response = await axios.get('https://makeup.p.rapidapi.com/products.json?brand=nyx',
        { headers: {
          'x-rapidapi-key': api_key,
          'x-rapidapi-host': 'makeup.p.rapidapi.com'
          }
        }
      );
      const getData = response.data;
      getData.map(elem =>
        // avoid products with no price and description
        (elem.price !== "0.0" && elem.description !== "") && productFields.push({
          id: elem.id,
          brand: elem.brand,
          name: elem.name,
          // fast resize images for better performance
          image_link: (elem.image_link.includes("?sw=390&sh=390&sm=fit")
            ? elem.image_link.replace("?sw=390&sh=390&sm=fit", "?sw=150&sh=150&sm=fit")
            : elem.image_link.concat("?sw=150&sh=150&sm=fit")),
          price_sign: elem.price_sign !== null ? elem.price_sign : "$",
          // normalize all prices number
          price: elem.price.replace(/\.0+$/, ".00"),
          category: elem.category,
          product_type: elem.product_type,
          description: elem.description,
        })
      )
      return productFields
    } catch (error) {
      throw (error.message)
    }
  },
);

/* createSlice makes all action creators and reducers in the same file
   so no separation of logic is necessary */
const productsAPISlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.productsFiltered = action.payload
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchProducts.fulfilled]: (state, action)=> {
      state.status = 'succeeded'
    /* pass productsAdapter as 'mutating' helper in case reducer
       it is passed as a value and createSlice will auto-generate action type / creator
       call setALL (generated reducer function from adapter)
       to "fill" getInitialState new entity contents with Api response */
      productsAdapter.setAll(state, action.payload)
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
});

// actions to dispatching
export const { getProductById, getProducts } = productsAPISlice.actions;

// value generated automatically by createSlice
export default productsAPISlice.reducer;

// returns 2 of the prebuilt selectors from getSelectors and renamed them
export const {
  // returns array of entities (after mapping through the Ids array)
  selectAll: selectAllProducts,
  // returns the element corresponding to the ID when state and ID will be passed
  selectById: selectProductById,
} = productsAdapter.getSelectors((state) => state.products);

