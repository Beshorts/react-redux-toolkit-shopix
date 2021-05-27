import React from 'react';

import PropTypes from 'prop-types';

import { FixedSizeGrid as Grid } from 'react-window';

import AutoSizer from 'react-virtualized-auto-sizer';

import { useMediaQuery } from "@material-ui/core";

// Mui components
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// import component
import ProductCard from './ProductCard';

// style
import './ProductsGrid.css';


const ProductsGrid = ({ productsFiltered }) => {

  // get Material UI media query breakpoint to change width cards
  const mobile = useMediaQuery(theme => theme.breakpoints.down("xs"));

  return(
    <div
      className="autoSizer"
      style={{
        display: 'flex',
        minHeight: "100vh",
        position: "sticky",
        margin: "auto",
        top: "0px",
        maxWidth: "1200px",
        paddingTop: "100px",
      }}
    >
      {/* virtualized grid container*/ }
      <AutoSizer>
       {({ width, height }) => {

        // change widht cell based on breakpoint
        const cellWidth = mobile ? 324 : 300;

        // fixed cell height
        const cellHeight = 300;

        /* create a number of columns based on viewport dynamic width and a single cell width
           for responsive resize of the grid */
        const columnCount = Math.floor(width / cellWidth);

        /* create a number of rows based on cards amount and reuslt of colomnCount
           for responsive resize of the grid */
        const rowCount = Math.ceil(productsFiltered.length / columnCount);

        // create a ref on first element for scrollToItem()
        const listRef = React.createRef();

        // scroll to top of Grid
        const scrollToTop = () => {
          listRef.current.scrollToItem({
            columnIndex: 0,
            rowIndex: 0,
          });
        };
          // onClick scroll up prev elements in Grid
        const scrollUp = () => {
          const anchor = document.querySelector(".cell");
          anchor.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        };

         return(
          <React.Fragment>
            <Zoom in={true}>
              <Fab
                color="primary"
                size="medium"
                aria-label="scroll back to top"
                style={{
                  position: "fixed",
                  bottom: "75px",
                  right: "28px",
                  zIndex: 1100 + 1,
                }}
                onClick={scrollToTop}>
                  <strong>top</strong>
              </Fab>
            </Zoom>
            <Zoom in={true}>
              <Fab
                color="primary"
                size="medium"
                aria-label="scroll up"
                style={{
                  position: "fixed",
                  bottom: "20px",
                  right: "28px",
                  zIndex: 1100 + 1,
                }}
                onClick={scrollUp}>
                  <KeyboardArrowUpIcon />
              </Fab>
            </Zoom>
            <Grid
              className="grid"
              style={{
                position: "fixed",
                paddingBottom: "100px"
              }}
              width={width}
              ref={listRef}
              height={height}
              columnCount={columnCount}
              columnWidth={cellWidth}
              rowCount={rowCount}
              rowHeight={cellHeight}
              itemData={{productsFiltered, columnCount}}
            >
              {ProductCard}
            </Grid>
          </React.Fragment>
         )
       }}
      </AutoSizer>
    </div>
  )
};

export default ProductsGrid;

ProductsGrid.propTypes = {
  productsFiltered: PropTypes.array.isRequired,
}

