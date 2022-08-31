import React from "react";
import { PropTypes } from "prop-types";
import * as S from "./Text.style";
import Common from "../../styles/common";

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
};

const defaultProps = {
  size: Common.fontSize.h[2],
  color: Common.colors.black[0],
  weight: "normal",
  type: "base",
};

const Text = ({ children, size, color, weight, type }) => {
  return (
    <S.Text size={size} color={color} weight={weight} type={type}>
      {children}
    </S.Text>
  );
};

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
