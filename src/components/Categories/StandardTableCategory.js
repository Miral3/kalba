import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const CategoriesBlock = styled.div`
  a {
    text-decoration:none !important;
    &:link { 
      color: black; 
      text-decoration: none;
    }
    &:visited{
      color: black; 
      text-decoration: none;
    }
  }
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #F0F0F0;
  height: auto !important;
  margin-top: 1rem !important;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  position: relative !important;
  border: 1px solid #d6d6d6;
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

const Category = styled(NavLink)`

  font-size: 1.125rem;
  cursor: pointer;
  text-decoration: none;
  padding: 15px;
  margin-left: 15px;
  
  &:hover{
    color: #495057;
  }

  &.active{
    font-weight: 600;
    color:white;
    background-color:#DA2A2A;
    &:hover {
      color: black;
    }
  }
  & + & {
    margin-left: 1rem;
  }
`;

const Categories = ({ type }) => {
  return (
    <CategoriesBlock>
      {type.map(c => (
        <Category
          key={c.name}
          activeClassName="active"
          exact={c.name === 'heores'}
          to={c.name === 'heroes' ? '/standardTable/heroes' : `/standardTable/${c.name}`}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;