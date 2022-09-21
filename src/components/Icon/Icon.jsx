import React from "react";
import PropTypes from "prop-types";
import * as S from "./Icon.style";
import Common from "../../styles/common";

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const defaultProps = {
  size: Common.fontSize.h[0],
  color: Common.colors.black[0],
  weight: "normal",
};

const Icon = ({ children, size, color, weight, ...styles }) => {
  return (
    <S.Icon
      className="material-symbols-outlined"
      size={size}
      color={color}
      weight={weight}
      {...styles}
    >
      {children}
    </S.Icon>
  );
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
