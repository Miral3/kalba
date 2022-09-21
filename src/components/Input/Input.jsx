import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import * as S from "./Input.style";

const propTypes = {
  placeholder: PropTypes.string,
  version: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

const defaultProps = {
  placeholder: "",
  version: "navigation",
  name: "",
  type: "text",
  onChange: () => {},
  onKeyDown: () => {},
};

const Input = forwardRef(
  ({ placeholder, version, name, type, onChange, onKeyDown }, ref) => {
    return (
      <S.Input
        name={name}
        placeholder={placeholder}
        version={version}
        ref={ref}
        type={type}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
  }
);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
