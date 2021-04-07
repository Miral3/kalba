import React from 'react';
import styled, { css } from 'styled-components';

const categories = [
  {
    name: 'attackpower',
    text: '공격력'
  },
  {
    name: 'donations',
    text: '지원률'
  }
];

const CategoriesBlock = styled.div`
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
  @media (min-width: 768px) {
    max-width: 720px;
  }
`;

const Category = styled.div`
  font-size: 1.125rem;
  cursor: pointer;
  text-decoration: none;
  padding: 15px;
  &:hover{
    color: #495057;
  }

  ${props =>
    props.active && css`
      font-weight: 600;
      color:white;
      background-color:#DA2A2A;
    `
  }
  & + & {
    margin-left: 1rem;
  }
`;

const Categories = ({ onSelect, category }) => {
  return (
    <CategoriesBlock>
      {categories.map(c => (
        <Category
          key={c.name}
          active={category === c.name}
          onClick{...() => onSelect(c.name)}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;