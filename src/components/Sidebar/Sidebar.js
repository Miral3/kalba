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
    height: 100vh;
    background-color: ${({ theme }) => theme.bgColors.category};
    border: ${({ theme }) => theme.borderColors.category};
    position: absolute;
    left : ${({ open }) => open ? '0' : '-200px'};
    transition: ${({ open }) => open ? '250ms' : '250ms'};
    @media (min-width: 991px) {
      left: 0;
      width: ${({ open }) => open ? '200px' : '60px'};
      transition: none;
    }
    .header {
      width: 100%;
      background-color: ${({ theme }) => theme.bgColors.category};
      display: flex;
      align-items: center;
      padding: 15px 0;

      @media (min-width: 991px) {
        justify-content: ${({ open }) => open ? 'flex-start' : 'center'};
      }
      .burger {
        position: relative;
        font-size: 24px;
        margin-left: 17px;
        @media (min-width: 991px) {
          margin-left: ${({ open }) => open ? '18px' : '0'};
        }
        cursor: pointer;
      }
      .sidebarTitle {
        color: ${({ theme }) => theme.fontColors.category};
        font-size: 20px;
        font-weight: 700;
        margin-left: 24px;
        @media (min-width: 991px) {
          display: ${({ open }) => open ? 'block' : 'none'};
        }
      }
    }
  }
`;

const Contents = styled(NavLink)`
  display: flex;
  align-items: center;
  width: 200px;
  height: 49px;
  cursor: pointer;
  @media (min-width: 991px) {
    width: ${({ open }) => open ? '200px' : '60px'};
    height: ${({ open }) => open ? '49px' : '60px'};
  }
  &.active{
    font-weight: 600;
    color: white;
    background-color:#DA2A2A;
  }
  .item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    @media (min-width: 991px) {
      flex-direction: ${({ open }) => open ? 'row' : 'column'};
      justify-content: ${({ open }) => open ? 'flex-start' : 'center'};
    }
    .icon {
      font-size: 24px;
      height: 24px;
      margin-left: 18px;
      @media (min-width: 991px) {
        margin-left: ${({ open }) => open ? '18px' : '0'};
        margin-top: 2px;
        height: 26px;
      }
    }
    .text {
      margin-left: 24px;
      font-size: 18px;
      @media (min-width: 991px) {
        margin-left: ${({ open }) => open ? '24px' : '0'};
        font-size: ${({ open }) => open ? '18px' : '10px'};
        text-align: ${({ open }) => open ? 'start' : 'center'};
      }
    }
  }
`;

const Sidebar = ({ open, menus, type, any, handleSidebar }) => {

  return (
    <Container open={open}>
      <nav className="sidebar">
        <div className="header">
          <GiHamburgerMenu
            className="burger"
            onClick={() => handleSidebar(open)}
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
              open={open}
            >
              <div className="item">
                <i className='icon'>{menu.icon}</i>
                <span className='text'>{menu.text}</span>
              </div>
            </Contents>
          );
        })}
      </nav>
    </Container>
  );
}

export default Sidebar;