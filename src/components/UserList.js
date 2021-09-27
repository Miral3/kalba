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
    z-index: 1;
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
  .blank {
    border: ${({ theme }) => theme.borderColors.list};
    background-color: ${({ theme }) => theme.bgColors.listContents};
    height: 42px;
  }
`;

const UserList = ({ type }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const temporary = new Array(50).fill(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `/coc/clan/rank`, {
          tag: "%232Y2Y9YCUU"
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        let data = new Array(response.data.length);
        if (type === "donations") {
          for(let rank of response.data) {
            data[rank.donationRank - 1] = rank;
          }
        } else {
          for(let rank of response.data) {
            data[rank.yonghaScoreRank - 1] = rank;
          }
        }
        setData(data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [type]);

  if (loading || !data) {
    return <Container>
      <table id="save-target">
        {headerDataByType(type)}
        <tbody>
          {temporary.map((data, idx) => (
            <tr key={idx} className="blank">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  }
  // if (!data) {
  //   return null;
  // }
  return (
    <Container>
      <table id="save-target">
        {headerDataByType(type)}
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