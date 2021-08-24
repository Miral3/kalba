import React from "react";
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.div`
  a {
    color: ${({ theme }) => theme.fontColors.category};
  }
  
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 365px;
  background-color: ${({ theme }) => theme.bgColors.category};
  border: ${({ theme }) => theme.borderColors.category};

  .header {
    width: 100%;
    background-color: ${({ theme }) => theme.bgColors.category};
    display: flex;
    justify-content: center;
    align-items: center;

    .sidebarTitle {
      color: ${({ theme }) => theme.fontColors.category};
      font-size: 20px;
      font-weight: 700;
      padding: 10px 0;
    }
  }
`;

const Contents = styled(NavLink)`
  width: 200px;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  padding: 15px;
  &.active{
    font-weight: 600;
    color: white;
    background-color:#DA2A2A;
  }
`;

const Sidebar = ({ open, menus, type, any }) => {
  return (
    open ?
      <Container>
        <div className="header">
          <div className="sidebarTitle">MENU</div>
        </div>
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
      :
      <div></div>
  );
}

export default Sidebar;