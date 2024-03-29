import React from "react";
import PropTypes from "prop-types";
import Base from "./Base";
import * as S from "./Box.style";

const propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

const defaultProps = {
  width: "100%",
  height: "520px",
};

const Box = ({ width, height }) => {
  return (
    <S.Container width={width} height={height}>
      <Base />
    </S.Container>
  );
};

Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;
