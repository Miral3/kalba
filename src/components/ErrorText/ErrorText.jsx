import React from "react";
import PropTypes from "prop-types";
// import { Icon } from "..";
import Common from "../../styles/common";
import * as S from "./ErrorText.style";

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const ErrorText = ({ value }) => {
  return (
    <S.ErrorText>
      <S.StyledIcon
        className="material-symbols-outlined"
        size={Common.fontSize.h[1]}
        color={Common.colors.red[0]}
      >
        Error
      </S.StyledIcon>
      {value}
    </S.ErrorText>
  );
};

ErrorText.propTypes = propTypes;

export default ErrorText;
