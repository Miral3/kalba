import React from 'react';

import styled from 'styled-components';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;

// const Label = styled.div`
//     font-size: 1rem;
//     color: #868e96;
//     margin-bottom: 0.25rem;
// `;

const Input = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1px solid #adb5bd;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    outline: none;
    /* line-height: 2.5rem; */
    font-size: 1rem;
    /* padding-left: 0.5rem;
    padding-right: 0.5rem; */
    &:focus {
      color: $oc-teal-7;
      border-bottom: 1px solid #495057;
    }
    /* ::placeholder {
      color: #dee2e6;
    } */
    @media(max-width: 500px) {
      width: auto;
    }
`;

const InputWithLabel = ({ label, ...rest }) => (
  <Wrapper>
    {/* <Label>{label}</Label> */}
    <Input {...rest} />
  </Wrapper>
);

export default InputWithLabel;