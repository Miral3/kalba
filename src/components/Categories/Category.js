import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const CategoriesBlock = styled.div`
  a {
    color: ${({ theme }) => theme.fontColors.category};
  }
  
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: ${({ theme }) => theme.bgColors.category};
  height: auto !important;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  position: relative !important;
  border: ${({ theme }) => theme.borderColors.category};
  border-top: 2px solid #e3342f;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (max-width: 576px) {
    margin: 0;
    border-left: 0;
    border-right: 0;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
`;

const Contents = styled(NavLink)`
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  padding: 15px;
  margin-left: 15px;

  &.active{
    font-weight: 600;
    color: white;
    background-color:#DA2A2A;
  }
  & + & {
    margin-left: 1rem;
  }
  @media (max-width: 375px) {
    padding: 5px;
  }
`;

const Category = ({ items, type, any }) => {
  return (
    <CategoriesBlock>
      {items.map(c => (
        <Contents
          key={c.name}
          activeClassName="active"
          exact={c.name === { any }}
          to={c.name === { any } ? `/${type}/score` : `/${type}/${c.name}`}
        >
          {c.text}
        </Contents>
      ))}
    </CategoriesBlock>
  );
};

export default Category;