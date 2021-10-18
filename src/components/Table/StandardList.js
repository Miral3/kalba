import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { heroes, pets, troops, spells, siegeMachines } from './data'

const Container = styled.div`
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

const StandardList = (props) => {
  const [data, setData] = useState(heroes);
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
  }, [category])

  const set = data.map((element) =>
    <tr className={`type ${category}`} key={element.id}>
      <td className="name">{element.name}</td>
      <td className="maxScore">{element.maxScore}</td>
      <td className="maxLevel">{element.maxLevel}</td>
      <td className="scoreCoefficient">{Math.ceil(element.scoreCoefficient * 1000) / 1000}</td>
    </tr>);

  // const temp = data[1]; // 옮기고싶은 데이터
  // const idx = 1; // 옮기고싶은 위치
  // data.splice(data.indexOf(temp), idx);
  // data.unshift(temp);

  return (
    <Container>
      <div className="tableBlock">
        <table className="apStandardTable">
          <thead className="head">
            <tr>
              <th className="type">종류</th>
              <th className="weight">최대 점수</th>
              <th className="maxScore">최대 레벨</th>
              <th className="maxLevel last">비례 점수</th>
            </tr>
          </thead>
          <tbody>
            {set}
          </tbody>
        </table>
      </div >
    </Container>
  );
};

export default StandardList;