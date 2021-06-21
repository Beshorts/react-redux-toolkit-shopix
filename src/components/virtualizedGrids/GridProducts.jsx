import React from 'react';

import { useSelector } from 'react-redux'

import PropTypes from 'prop-types';

import { FixedSizeGrid as Grid } from 'react-window';

// import element
import GridsHeaders from '../elements/GridsHeaders';
import { useOneRowGrid } from '../elements/customHooks';

const GridProducts = ({children, width}) => {

  // state of products filtered by category
  const productsFiltered = useSelector(state => state.products.productsFiltered);

  // state of current category filter
  const currentCategory = useSelector(state => state.filters.filterBy);

   //  pass requested parameters to fill the Grid and destructure custom hook
  const { cellWidth, cellHeight, columnCount, rowCount, itemData } = useOneRowGrid(226, productsFiltered)

  const gridStyle = {
   position: "sticky",
  };

  return(
    <>
      <GridsHeaders
        data={productsFiltered}
        text="items"
        symbol={"💪"}
        label="muscle"
        title={currentCategory}/>
      <Grid
        className="grid"
        direction="ltr"
        style={gridStyle}
        width={width}
        height={cellHeight}
        columnCount={columnCount}
        columnWidth={cellWidth}
        rowCount={rowCount}
        rowHeight={cellHeight}
        itemData={itemData}
      >
        {children}
      </Grid>
    </>
  )
};

export default GridProducts;

GridProducts.propTypes = {
  children: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
}
