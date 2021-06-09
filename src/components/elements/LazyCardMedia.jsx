import React, {useState, useEffect, useRef} from 'react';

import PropTypes from 'prop-types';

import { CardMedia } from '@material-ui/core';

// build lazy load img on enter screen to boost performance
const LazyCardMedia = elem => {

  const { className, image, alt, height } = elem;

  const [visible, setVisible] = useState(false);

  const placeholderRef = useRef(null);

  useEffect(() => {
    if (!visible && placeholderRef.current) {
      const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
        if (intersectionRatio > 0) {
          setVisible(true);
        }
      });
      observer.observe(placeholderRef.current);
      return () => observer.disconnect();
    }
  }, [visible, placeholderRef]);

 return (
   visible ?
    <CardMedia
      component='img'
      className={className}
      image={image}
      alt={alt}
      height={height}
    />
    :
    <div
      style={{height: height, backgroundColor: "#99d98c", opacity: ".4"}}
      aria-label={alt}
      ref={placeholderRef}
     // offset={250}
    />
  );
};

export default LazyCardMedia;

LazyCardMedia.propTypes = {
    elem: PropTypes.shape({
    className: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
  })
}
