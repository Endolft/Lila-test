import Image from 'next/image';
import PropTypes from 'prop-types';
import { basePath } from 'next.config';

/** Wrapper for Next's Image component. Adds basepath to correctly locate static assets. */
const Img = ({ src, alt, ...props }) => (
  <Image
    src={
      typeof src === 'string' && src.startsWith('/assets')
        ? `${basePath ?? ''}${src}`
        : src
    }
    alt={alt}
    {...props}
  />
);

Img.propTypes = {
  src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  alt: PropTypes.string.isRequired,
};

export default Img;
