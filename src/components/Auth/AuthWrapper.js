import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Positioner = styled.div`
    /* position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 0px;
`;

const ShadowedBox = styled.div`
    width: 500px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    @media(max-width: 500px) {
      width: auto;
    }
`;

const LogoWrapper = styled.div`
    background: #da292a;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Logo = styled(Link)`
    color: white;
    font-family: 'cocLight';
    font-size: 3.2rem;
    text-decoration: none;
`;

const Contents = styled.div`
    background: white;
    padding: 2rem;
    height: auto;
`;

const AuthWrapper = ({ children }) => (
  <Positioner>
    <ShadowedBox>
      <LogoWrapper>
        <Logo to="/">Kalba</Logo>
      </LogoWrapper>
      <Contents>
        {children}
      </Contents>
    </ShadowedBox>
  </Positioner>
);

export default AuthWrapper;