import React from "react";
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.div`
  a {
    color: ${({ theme }) => theme.fontColors.category};
  }
  
  float: right;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 365px;
  background-color: ${({ theme }) => theme.bgColors.category};
  border: ${({ theme }) => theme.borderColors.category};
`;

const Contents = styled(NavLink)`
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  padding: 15px;
  margin-top: 15px;

  &.active{
    font-weight: 600;
    color: white;
    background-color:#DA2A2A;
  }
  & + & {
    margin-bottom: 1rem;
  }
`;

const Sidebar = ({ menus, type, any }) => {
  return (
    <Container>
      {menus.map((menu, idx) => {
        return (
          <Contents
            key={idx}
            activeClassName="active"
            exact={menu.name === { any }}
            to={menu.name === { any } ? `/${type}/quiz` : `/${type}/${menu.name}`}
          >
            {menu.text}
          </Contents>
        );
      })}
    </Container>
  );
}

export default Sidebar;