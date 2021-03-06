import React from 'react';

import { useSelector } from 'react-redux';

import {Wrapper} from './styles';

import PropTypes from 'prop-types';

// redux memoized Selector
import { productsBestPrices } from '../../selectors/products';

import { FixedSizeGrid as Grid } from 'react-window';

// import element
import GridsHeaders from '../elements/GridsHeaders';
import { useOneRowGrid } from '../elements/customHooks';

const GridBestPrices = ({ children, width }) => {

  // import state
  const bestPrices = useSelector(productsBestPrices);

  const { cellWidth, cellHeight, columnCount, rowCount, itemData } = useOneRowGrid(135, bestPrices)

  const gridStyle = {
   position: "sticky",
  };

  return(
    <Wrapper>
      <GridsHeaders
        data={bestPrices}
        text="items"
        symbol={"🔥"}
        label="hot"
        title={"hot prices"}/>
      <Grid
        className="grid"
        direction="ltr"
        width={width}
        style={gridStyle}
        height={cellHeight}
        columnCount={columnCount}
        columnWidth={cellWidth}
        rowCount={rowCount}
        rowHeight={cellHeight}
        itemData={itemData}
      >
        {children}
      </Grid>
    </Wrapper>
  )
};

export default GridBestPrices;

GridBestPrices.propTypes = {
  children: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
}
