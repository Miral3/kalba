import React from 'react';
import styled from 'styled-components';

import Categories from '../Categories/StandardTableCategory';

import HeroesTable from '../Table/HeroesTable';
import SiegeMachinesTable from '../Table/SiegeMachinestable';
import SpellsTable from '../Table/SpellsTable';
import TroopsTable from '../Table/TroopsTable';

const Table = styled.div`
  display: flex;  
  height: auto;
  margin-top: 1rem;
  justify-content: space-around;
  width:100%;
`

const rankCategories = [
  {
    name: 'heroes',
    text: '영웅'
  },
  {
    name: 'siegeMachines',
    text: '시즈머신'
  },
  {
    name: 'spells',
    text: '마법'
  },
  {
    name: 'troops',
    text: '유닛'
  }
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
  }
}


const Standardtable = ({ match }) => {
  const category = match.params.category || 'heroes';

  return (
    <div>
      <Categories type={rankCategories} />
      <Table>
        {selectTable({ category })}
      </Table>
    </div>
  );
};

export default Standardtable;