import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { VscLoading } from 'react-icons/vsc'
import styled from 'styled-components';

import UserInfo from './UserInfo';
import { headerDataByType } from '../tools/tools';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  margin-right: 12px;
  padding: 1.5rem 0;
  @media (max-width: 992px) {
    margin: 0;
  }
  .blockTitle__addBtn {
    background-color: ${({ theme }) => theme.bgColors.listFirstHeader};
    color: white;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 700;
  }
  .blockTitle__addBtn .btn {
    float: right;
  }
  .blockTitle__addBtn .icon {
    margin-right:5px;
    vertical-align: middle;
  }
  .loading {
    //회전하는 애니메이션
    //2s는 time period를 뜻하며 적을수록 회전이 빨라짐
    animation: rotate_image 2s linear infinite; 
    transform-origin: 50% 50%; // 회전의 중심 위치
    @keyframes rotate_image{
	    100% {
    	transform: rotate(360deg);
      }
    }
  } 
  .blockTitle__addBtn .refresh {
    margin-right: 40px;
    cursor: pointer;
    &:hover{
      border-bottom: 1px solid #ffffff;
    }
  }
  .blockTitle__addBtn .addBtn {
    text-decoration: none;
    color: white;
    &:hover{
      border-bottom: 1px solid #ffffff;
    }
  }

  table {
    display: table;
    width: 100%;
    border-collapse: collapse;
  }
  .blockHead tr {
    th {
    background-color: ${({ theme }) => theme.bgColors.listSecondHeader};
    color: ${({ theme }) => theme.fontColors.listHeader};
    font-weight: normal;
    padding: 12px 0;
    font-size: 13px;
    }
    .rank {
      display: table-cell;
      width: 10%;
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
      @media (min-width: 992px) and (max-width: 1165px) {
        font-size: 12px;
        width: 13%;
      }
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

const RankingList = ({ title, type }) => {
  const [donationData, setDonationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [toggle, setToggle] = useState(false);
  const temporary = new Array(10).fill(0);

  const onClick = async () => {
    try {
      setLoading2(true);
      const res = await axios.post(
        '/coc/clan/force/update', {
        id: "%232Y2Y9YCUU"
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (Number(res.data.status) === 200) {
        setToggle(!toggle);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading2(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `/coc/clan/${type}/rank`, {
          id: "%232Y2Y9YCUU"
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setDonationData(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [toggle]);

  if (loading || !donationData) {
    return <Container>
      <div className="blockTitle__addBtn">
        <span className="title">{title}</span>
        <div className="btn">
          {loading2 ? <i className="icon"><VscLoading className="loading" /></i> : null}
          <span className="refresh" onClick={onClick}>{loading2 ? '갱신중' : '갱신'}</span>
          <Link to={`/leaderboards/${type}`} className="addBtn">
            더보기
          </Link>
        </div>
      </div>
      <table>
        <thead className="blockHead">
          {headerDataByType(type)}
        </thead>
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
  // if (!donationData) {
  //   return null;
  // }

  return (
    <Container>
      <div className="blockTitle__addBtn">
        <span className="title">{title}</span>
        <div className="btn">
          {loading2 ? <i className="icon"><VscLoading className="loading" /></i> : null}
          <span className="refresh" onClick={onClick}>{loading2 ? '갱신중' : '갱신'}</span>
          <Link to={`/leaderboards/${type}`} className="addBtn">
            더보기
          </Link>
        </div>
      </div>
      <table>
        <thead className="blockHead">
          {headerDataByType(type)}
        </thead>
        <tbody>
          {donationData.slice(0, 10).map((data, idx) => (
            <UserInfo key={data.tag} idx={idx + 1} info={data} type={type} />
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default RankingList;