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
  
  .tableBlock {
    padding-bottom: 3rem;
    width: 100%;

    @media (min-width: 576px) {
      max-width: 540px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
  }
  table {
    width: 100%;
    /* border: 1px solid #e6e2d6; */
    border-collapse: collapse;
  }

  .head tr th {
    position: sticky;
    top: 0;
    font-weight: normal;
    color: ${({ theme }) => theme.fontColors.listHeader};
    font-size: 14px;
    padding: 12px 16px;
    background-color: ${({ theme }) => theme.bgColors.listSecondHeader};

    @media (max-width: 425px) {
      padding: 12px 12px;
    }
    @media (max-width: 385px) {
      font-size: 12px;
      padding: 12px 8px;
    }
  }

  th,
  td {
    padding: 0.5rem;
  }
  tbody {
    background-color: ${({ theme }) => theme.bgColors.listContents};
  }
  tbody tr td {
    border-bottom: ${({ theme }) => theme.borderColors.list};
    font-size: 14px;
    padding: 12px 16px;
    text-align: center;

    color: ${({ theme }) => theme.fontColors.listInfo};
  }

  tbody tr .name {
    width: 40%;

    color: ${({ theme }) => theme.fontColors.listName};
  }
`

const items = [
  { name: 'heroes', text: '영웅' },
  { name: 'pets', text: '펫' },
  { name: 'troops', text: '유닛' },
  { name: 'spells', text: '마법' },
  { name: 'siegeMachines', text: '시즈머신' },
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