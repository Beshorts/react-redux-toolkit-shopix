import React from 'react';

import PropTypes from 'prop-types';

// Mui components
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


// react-window works with inline style
const ScrollGridBtn = ({scrollToTop, scrollUp}) => {

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
            zIndex: 1100,
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
            zIndex: 1100,
          }}
          onClick={scrollUp}>
            <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </React.Fragment>
  )
};

export default ScrollGridBtn;


ScrollGridBtn.propTypes = {
  scrollToTop: PropTypes.func.isRequired,
  scrollUp: PropTypes.func.isRequired,
}

