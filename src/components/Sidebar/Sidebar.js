import React from "react";
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { GiHamburgerMenu } from "react-icons/gi";

const Container = styled.div`
  z-index:4;
  a {
    color: ${({ theme }) => theme.fontColors.category};
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    height: 80vh;
    background-color: ${({ theme }) => theme.bgColors.category};
    border: ${({ theme }) => theme.borderColors.category};
    position: absolute;
    left: -200px;
    transition: 850ms;
    .header {
      width: 100%;
      background-color: ${({ theme }) => theme.bgColors.category};
      display: flex;
      justify-content: center;
      align-items: center;
      .burger {
        position: relative;
        font-size: 30px;
        cursor: pointer;
        left: -40px;
      }
      .sidebarTitle {
        color: ${({ theme }) => theme.fontColors.category};
        font-size: 20px;
        font-weight: 700;
        padding: 10px 0;
      }
    }
  }

  .sidebar.active {
    left: 0;
    transition: 350ms;
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

const Sidebar = ({ open, menus, type, any, handleSidebar }) => {
  const onClick = () => {
    handleSidebar(open);
  }

  return (
    <Container>
      <nav className={open ? "sidebar active" : "sidebar"}>
        <div className="header">
          <GiHamburgerMenu
            className="burger"
            onClick={() => onClick()}
          />
          <div className="sidebarTitle">MENU</div>
        </div>
        {menus.map((menu, idx) => {
          return (
            <Contents
              key={idx}
              activeClassName="active"
              exact={menu.name === { any }}
              to={menu.name === { any } ? `/${type}/management` : `/${type}/${menu.name}`}
            >
              {menu.text}
            </Contents>
          );
        })}
      </nav>
    </Container>
  );
}

export default Sidebar;