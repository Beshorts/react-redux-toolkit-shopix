import React from 'react';

import { useSelector } from 'react-redux'

import PropTypes from 'prop-types';

import { FixedSizeGrid as Grid } from 'react-window';

// import element
import GridsHeaders from '../elements/GridsHeaders';
import { useOneRowGrid } from '../elements/customHooks';

const GridProducts = ({children, width}) => {
console.log("gridProducts")

  // state of products filtered by category
  const productsFiltered = useSelector(state => state.products.productsFiltered);

   //  pass requested parameters to fill the Grid and destructure custom hook
  const { cellWidth, cellHeight, columnCount, rowCount, itemData } = useOneRowGrid(220, productsFiltered)

  const gridStyle = {
   position: "sticky",
  };

  return(
    <>
      <GridsHeaders
        margin={16}
        data={productsFiltered}
        text="items"
        symbol={"💪"}
        label="muscle"
        title={"see all"}/>
      <Grid
        className="grid"
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
