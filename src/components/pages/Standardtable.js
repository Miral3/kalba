import React from 'react';
import styled from 'styled-components';
import HeroesTable from '../HeroesTable';
import SiegeMachinesTable from '../SiegeMachinestable';
import SpellsTable from '../SpellsTable';
import TroopsTable from '../TroopsTable';

const Table = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;
  justify-content: space-between;
`

const Standardtable = () => {
  return (
    <Table>
      <HeroesTable />
      <SiegeMachinesTable />
      <SpellsTable />
      <TroopsTable />
    </Table>
  );
};

export default Standardtable;