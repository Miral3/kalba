import React from "react";
import PropTypes from "prop-types";
import * as S from "./Base.style";

const propTypes = {
  size: PropTypes.string,
};
const defaultProps = {
  size: "28px",
};

const Base = ({ size }) => {
  return <S.Spinner src="/icons/spinner.svg" alt="spinner" size={size} />;
};

Base.propTypes = propTypes;
Base.defaultProps = defaultProps;

export default Base;
