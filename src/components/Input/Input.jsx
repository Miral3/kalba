import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import * as S from "./Input.style";

const propTypes = {
  placeholder: PropTypes.string,
  version: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

const defaultProps = {
  placeholder: "",
  version: "navigation",
  onChange: () => {},
  onKeyDown: () => {},
};

const Input = forwardRef(
  ({ placeholder, version, onChange, onKeyDown }, ref) => {
    return (
      <S.Input
        placeholder={placeholder}
        version={version}
        ref={ref}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
  }
);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
