import React from 'react';
import PropTypes from 'prop-types';

import styles from './button.css';

const Button = (props) => (
  <button
    onClick={ props.onClick }
    className={ `${styles.button} ${props.className}`}
  >
    { props.message }
  </button>
);

Button.propTypes = {
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};


export default Button;

