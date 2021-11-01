/* React */
import React from 'react';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import Categories from '../../components/Categories/Category';
import StandardList from '../../components/Table/StandardList';

const Container = styled.div`
  padding-top: 1.5rem;
`

const items = [
  { name: 'heroes', text: '영웅' },
  { name: 'pets', text: '펫' },
  { name: 'troops', text: '유닛' },
  { name: 'spells', text: '마법' },
  { name: 'siegeMachines', text: '시즈머신' },
];

const StandardTable = ({ match }) => {
  const category = match.params.category || 'heroes';
  const type = "standardTable"

  return (
    <Container>
      <Categories items={items} type={type} any="heroes" />
      <StandardList category={category} />
    </Container>
  );
}

export default StandardTable;