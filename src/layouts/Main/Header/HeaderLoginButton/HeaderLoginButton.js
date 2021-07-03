import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BorderedButton = styled(Link)`
    .contents {
      color: #fff;
    }
    font-weight: 600;
    background-color: #262B36;
    border: 1px solid #fff;
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    
    &:hover {
      background: #000;
      color: white;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
`;

const LoginButton = () => (
  <BorderedButton to="/auth/login">
    <span className="contents">
      로그인 / 가입
    </span>
  </BorderedButton>
);

export default LoginButton;