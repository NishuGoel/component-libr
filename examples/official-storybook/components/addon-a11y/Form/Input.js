import React from 'react';
import PropTypes from 'prop-types';

function Input({ id, value, type, placeholder }) {
  return <input id={id} value={value} placeholder={placeholder} type={type} />;
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'password']),
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  type: null,
  id: null,
  value: null,
  placeholder: null,
};

export default Input;
