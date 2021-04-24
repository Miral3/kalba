/* React */
import React from 'react';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import Categories from '../../components/Categories/Category';
import HeroesTable from '../../components/Table/HeroesTable';
import SiegeMachinesTable from '../../components/Table/SiegeMachinestable';
import SpellsTable from '../../components/Table/SpellsTable';
import TroopsTable from '../../components/Table/TroopsTable';
import PetsTable from '../../components/Table/PetsTable';

const Container = styled.div`
  padding-top: 1.5rem;
`

const Table = styled.div`
  display: flex;  
  height: auto;
  margin-top: 1rem;
  justify-content: space-around;
  width:100%;
`
const items = [
  { name: 'heroes', text: '영웅' },
  { name: 'siegeMachines', text: '시즈머신' },
  { name: 'spells', text: '마법' },
  { name: 'troops', text: '유닛' },
  { name: 'pets', text: '펫' }
];

const selectTable = (props) => {
  const type = props.category;
  if (type === 'heroes') {
    return <HeroesTable />
  } else if (type === 'siegeMachines') {
    return <SiegeMachinesTable />
  } else if (type === 'spells') {
    return <SpellsTable />
  } else if (type === 'troops') {
    return <TroopsTable />
  } else if (type === 'pets') {
    return <PetsTable />
  }
}

const StandardTable = ({ match }) => {
  const category = match.params.category || 'heroes';

  return (
    <Container>
      <Categories items={items} type="standardTable" any="heores" />
      <Table>
        {selectTable({ category })}
      </Table>
    </Container>
  );
}

export default StandardTable;