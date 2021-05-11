import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import UserInfo from './UserInfo';
import axios from 'axios';

const Container = styled.div`
  height: auto !important;
  margin-top: 1rem !important;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 1.5rem;
  position: relative !important;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  table {
    display: table;
    width: 100%;
    border-collapse: collapse;
  }
  .head tr{
    th {
    position: sticky;
    top:0;
    background-color: ${({ theme }) => theme.bgColors.listSecondHeader};
    color: ${({ theme }) => theme.fontColors.listHeader};
    font-weight: normal;
    padding: 12px 0;
    font-size: 13px;
    }
    .rank {
      display: table-cell;
      width:10%;
      padding-left:3px;
      @media (max-width: 425px) {
        display: none;
      }
    }
    .name {
      text-align:left;
      width: 60%;
      padding-left: 16px;
    }
    .trophies,
    .townHallLevel,
    .donations,
    .attackPower {
      width: 10%;
      padding-right:3px;
    }
  }
`;

const UserList = ({ category }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'score' ? 'score' : `${category}`;
        const response = await axios.post(
          `/coc/clan/${query}/rank`, {
          id: "%232Y2Y9YCUU"
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  if (loading) {
    return <Container>대기 중...</Container>
  }
  if (!data) {
    return null;
  }
  return (
    <Container>
      <table>
        <thead className="head">
          <tr>
            <th className="rank">#</th>
            <th className="name">이름</th>
            <th className="trophies">트로피</th>
            <th className="townHallLevel">홀</th>
            <th className="attackPower">공격력</th>
            <th className="donations">지원량</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, idx) => (
            <UserInfo key={data.tag} idx={idx + 1} info={data} />
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default UserList;