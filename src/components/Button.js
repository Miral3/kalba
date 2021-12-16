import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginButtonWrapper = styled(Link)`
    font-weight: 500;
    border: 1px solid #fff;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    background-color: #383F4C;
    .contents {
      color: #fff;
    }
    &:hover {
      background-color: #303845;
      color: white;
    }
`;

const LogoutButtonWrapper = styled(Link)`
    font-weight: 500;
    border: 1px solid #fff;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    background-color: ${({ theme }) => theme.bgColors.accountInfo};
    .contents {
      color: ${({ theme }) => theme.fontColors.accountInfo};
    }
    &:hover {
      background-color: ${({ theme }) => theme.bgColors.accountInfoHover};
      color: white;
    }
`;

export const LoginButton = ({ children }) => (
  <LoginButtonWrapper to="/auth/login">
    <span className="contents">
      {children}
    </span>
  </LoginButtonWrapper>
);

export const LogoutButton = ({ children, onClick }) => (
  <LogoutButtonWrapper to="/" onClick={onClick}>
    <span className='contents'>
      {children}
    </span>
  </LogoutButtonWrapper>
);