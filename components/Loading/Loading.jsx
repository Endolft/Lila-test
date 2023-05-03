import PropTypes from 'prop-types';
import styles from './Loading.module.css';

const Loading = ({ show }) => {
  return (
    show && (
      <div className={styles.container}>
        <div className={styles.spinner}></div>
      </div>
    )
  );
};

Loading.propTypes = {
  show: PropTypes.bool,
};

Loading.defaultProps = {
  show: false,
};

export default Loading;
