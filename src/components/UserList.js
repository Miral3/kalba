import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import UserInfo from './UserInfo';
import { headerDataByType } from '../tools/tools';
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
      width: 40%;
      padding-left: 16px;
      @media (max-width: 425px) {
        width: 20%;
      }
    }
    .side {
      width: 10%;
      padding-right:3px;
    }
    .currentRole, .expectedRole {
      @media (max-width: 340px) {
        font-size: 12px;
      }
    }
  }
`;

const UserList = ({ type }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = type === 'score' ? 'score' : `${type}`;
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
  }, [type]);

  if (loading) {
    return <Container>대기 중...</Container>
  }
  if (!data) {
    return null;
  }
  return (
    <Container>
      <table id="save-target">
        <thead className="head">
          {headerDataByType(type)}
        </thead>
        <tbody>
          {data.map((data, idx) => (
            <UserInfo key={data.tag} idx={idx + 1} info={data} type={type} />
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default UserList;