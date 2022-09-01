import React from "react";
import PropTypes from "prop-types";
import * as S from "./Button.style";

const propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  version: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  type: "button",
  disabled: false,
  version: "auth",
  onClick: () => {},
};

const Button = ({ children, type, disabled, version, onClick }) => {
  return (
    <S.Button
      type={type}
      disabled={disabled}
      version={version}
      onClick={onClick}
    >
      {children}
    </S.Button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;