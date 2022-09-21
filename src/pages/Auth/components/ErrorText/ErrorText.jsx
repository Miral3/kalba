import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../../../../components";
import Common from "../../../../styles/common";
import * as S from "./ErrorText.style";

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const ErrorText = ({ value }) => {
  return (
    <S.ErrorText>
      <Icon
        size={Common.fontSize.h[1]}
        color={Common.colors.red[0]}
        style={{ display: "inline" }}
      >
        Error
      </Icon>
      {value}
    </S.ErrorText>
  );
};

ErrorText.propTypes = propTypes;

export default ErrorText;
