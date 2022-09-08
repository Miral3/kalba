import React from "react";
import PropTypes from "prop-types";
import * as S from "./Button.style";

const propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  version: PropTypes.string,
  onClick: PropTypes.func,
  hover: PropTypes.bool,
};

const defaultProps = {
  type: "button",
  disabled: false,
  version: "text",
  onClick: () => {},
  hover: false,
};

const Button = ({
  children,
  type,
  disabled,
  version,
  onClick,
  hover,
  ...styles
}) => {
  return (
    <S.Button
      type={type}
      disabled={disabled}
      version={version}
      onClick={onClick}
      hover={hover}
      {...styles}
    >
      {children}
    </S.Button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
