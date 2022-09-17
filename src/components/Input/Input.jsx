import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import * as S from "./Input.style";

const propTypes = {
  placeholder: PropTypes.string,
  version: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

const defaultProps = {
  placeholder: "",
  version: "navigation",
  name: "",
  value: "",
  onChange: () => {},
  onKeyDown: () => {},
};

const Input = forwardRef(
  ({ placeholder, version, name, value, onChange, onKeyDown }, ref) => {
    return (
      <S.Input
        name={name}
        placeholder={placeholder}
        version={version}
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
  }
);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
