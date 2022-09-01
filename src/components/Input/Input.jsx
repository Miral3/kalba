import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import * as S from "./Input.style";

const propTypes = {
  placeholder: PropTypes.string,
  version: PropTypes.string,
};

const defaultProps = {
  placeholder: "",
  version: "navigation",
};

const Input = forwardRef(({ placeholder, version }, ref) => {
  return <S.Input placeholder={placeholder} version={version} ref={ref} />;
});

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
