import React from 'react';

import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  height: 24px;
  cursor: pointer;
  ${props =>
    props.checked &&
    css`
    color: #F50157;
  `}
`;

const NumberCheckBox = ({ className, handleChange, num, icon, checked }) => {
  return (
    <Wrapper className={className} onClick={() => handleChange(num)} checked={checked}>
      {
        !checked ?
          icon.icon :
          icon.checkedIcon
      }
    </Wrapper>
  )
}

export default NumberCheckBox;