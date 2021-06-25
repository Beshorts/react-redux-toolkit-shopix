import React from 'react';

import { useSelector } from 'react-redux';

import styled from 'styled-components';

import {Wrapper} from './styles';


import PropTypes from 'prop-types';

// redux Selector
import { productsSuggested } from '../../selectors/products';

import { FixedSizeGrid as Grid } from 'react-window';

// import element
import GridsHeaders from '../elements/GridsHeaders';
import { useOneRowGrid } from '../elements/customHooks';


const GridSuggestions = ({ children, width }) => {

  // state of products filtered by category
  const highlighted = useSelector(productsSuggested);

  //passing height and state parameters
  const { cellWidth, cellHeight, columnCount, rowCount, itemData } = useOneRowGrid(190, highlighted);

  const gridStyle = {
  };


  return(
    <WrapperPadding>
      <GridsHeaders
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
    </WrapperPadding>
  )
};

export default GridSuggestions;

// add padding on styled-component
const WrapperPadding = styled(Wrapper)`
  padding-bottom: 48px;
`;

GridSuggestions.propTypes = {
  children: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
}
