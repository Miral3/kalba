import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import * as S from "./Input.style";

const propTypes = {
  placeholder: PropTypes.string,
  version: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
};

const defaultProps = {
  placeholder: "",
  version: "navigation",
  name: "",
  type: "text",
  autoComplete: "off",
  disabled: false,
  onChange: () => {},
  onKeyDown: () => {},
  onFocus: () => {},
};

const Input = forwardRef(
  (
    {
      placeholder,
      version,
      name,
      type,
      autoComplete,
      disabled,
      onChange,
      onKeyDown,
      onFocus,
    },
    ref
  ) => {
    return (
      <S.Input
        name={name}
        placeholder={placeholder}
        version={version}
        ref={ref}
        type={type}
        autoComplete={autoComplete}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
      />
    );
  }
);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
