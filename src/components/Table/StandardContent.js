import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { heroes, pets, troops, spells, siegeMachines } from './data';

const Container = styled.tbody`
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
const StandardContent = (props) => {
  const [data, setData] = useState(null);
  const category = props.category;

  useEffect(() => {
    if (category === 'heroes') {
      setData(heroes);
    } else if (category === 'pets') {
      setData(pets);
    } else if (category === 'troops') {
      setData(troops);
    } else if (category === 'spells') {
      setData(spells);
    } else if (category === 'siegeMachines') {
      setData(siegeMachines);
    }
  })

  return (
    <Container>
      {spells.map((arr, idx) => {
        <tr className="types" key={idx}>
          {arr.map((value, num) => {
            if (num === 0) {
              return <td className="type name">{value}</td>
            } else if (num === 3) {
              return <td className="type">{Math.ceil(value * 1000) / 1000}</td>
            } else {
              return <td>{value}</td>
            }
          })}
        </tr>
      })}
    </Container >
  );
};

export default StandardContent;