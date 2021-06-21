import React from 'react';

import { useSelector } from 'react-redux'

// redux Selector
import { productsSuggested } from '../../selectors/products';

import PropTypes from 'prop-types';

import { FixedSizeGrid as Grid } from 'react-window';

// import element
import GridsHeaders from '../elements/GridsHeaders';
import { useOneRowGrid } from '../elements/customHooks';


const GridSuggestions = ({ children, width }) => {

  // state of products filtered by category
  const highlighted = useSelector(productsSuggested);

  //passing height and state parameters
  const { cellWidth, cellHeight, columnCount, rowCount, itemData } = useOneRowGrid(210, highlighted);

  const gridStyle = {
   position: "sticky",
  };

  return(
    <>
      <GridsHeaders
        margin={2}
        data={highlighted}
        text="items"
        symbol={"👏"}
        label="applause"
        title={"suggested"}
      />
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

export default GridSuggestions;

GridSuggestions.propTypes = {
  children: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
}
