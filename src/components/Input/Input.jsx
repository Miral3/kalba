import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import * as S from "./Input.style";

const propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

const defaultProps = {
  placeholder: "",
  type: "navigation",
};

const Input = forwardRef(({ placeholder, type }, ref) => {
  return <S.Input placeholder={placeholder} type={type} ref={ref} />;
});

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
