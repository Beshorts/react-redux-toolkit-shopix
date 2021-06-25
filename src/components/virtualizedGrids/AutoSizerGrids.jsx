import React, {Suspense, lazy} from 'react';

import styled from 'styled-components';

import PropTypes from 'prop-types';

import AutoSizer from 'react-virtualized-auto-sizer';

// MUI components
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// MUi utilities
import useMediaQuery from '@material-ui/core/useMediaQuery';

// import components
import GridProducts from './GridProducts';
import GridBestPrices from './GridBestPrices';
import GridSuggestions from './GridSuggestions';

//import elements
import ScrollToTopOnPage from '../elements/ScrollToTopOnPage';

// import components as lazy load
const ProductCard = lazy(() => import('../products/ProductCard'));
const BestPricesCard = lazy(() => import('../products/BestPricesCard'));
const HighLightCard = lazy(() => import('../products/HighLightCard'));

const AutoSizerGrids = () => {

  const isLargeScreen = useMediaQuery(theme => theme.breakpoints.up("md"));

  const autoSizerStyle = {
    minHeight: "100vh",
    position: "sticky",
    top: "0px",
    margin: "auto",
    display: 'flex',
  };

  return(
    <div className="autoSizer" style={autoSizerStyle} >
      <AutoSizer>
       {({ width, height }) => {
        return(
          <>
            <div className="anchor" id="back-to-top-anchor" />
              <Suspense fallback={<div/>}>
                <Wrapper isLargeScreen={isLargeScreen} >
                  <GridProducts width={width} >
                    {ProductCard}
                  </GridProducts>
                  <GridBestPrices width={width} >
                    {BestPricesCard}
                  </GridBestPrices>
                  <GridSuggestions width={width}>
                    {HighLightCard}
                  </GridSuggestions>
                </Wrapper>
              </Suspense>
              <ScrollToTopOnPage >
                <Fab color="primary" size="small" aria-label="scroll back to top">
                  <KeyboardArrowUpIcon />
                </Fab>
              </ScrollToTopOnPage>
          </>
        )
       }}
      </AutoSizer>
    </div>
  )
};

export default AutoSizerGrids;

// styled-component
const Wrapper = styled.section`
  width: 100%;
  margin-top: ${props => props.isLargeScreen ? "40px" : "110px"};
`;

AutoSizerGrids.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}
