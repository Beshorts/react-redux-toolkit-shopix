import React, {Suspense, lazy} from 'react';

import PropTypes from 'prop-types';

import { FixedSizeGrid as Grid } from 'react-window';

import AutoSizer from 'react-virtualized-auto-sizer';

import { useMediaQuery } from "@material-ui/core";

// style
import './ProductsGrid.css';

// import element
import SkeletonCardGrid from '../elements/SkeletonCardGrid';

// import lazy component
const ProductCard = lazy(() => import('./ProductCard'));
const ScrollGridBtn = lazy(() => import('./ScrollGridBtn'));

const ProductsGrid = ({ productsFiltered }) => {

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

        // fixed cell width
        const cellWidth = 280;

        // fixed cell height
        const cellHeight = 300;

        /* create a number of columns based on viewport dynamic width and a single cell width
           for responsive grid resize */
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
            <Suspense fallback={<SkeletonCardGrid />} >
              <ScrollGridBtn scrollToTop={scrollToTop} scrollUp={scrollUp}/>
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
            </Suspense>
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

