import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { VscLoading } from 'react-icons/vsc'
import styled from 'styled-components';

import Thead from './Thead';
import Tbody from './Tbody';
import { getLeagueDate, getPromotionDate, prettierTime, calRemainTime, useInterval } from '../tools/tools';
import axios from 'axios';
import { useSortableData } from './Hooks/useSortableData';

const Container = styled.div`
  width: 100%;
  margin-right: 12px;
  padding-bottom: 1.5rem;
  @media (max-width: 992px) {
    margin: 0;
  }
  .header {
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.bgColors.listFirstHeader};
    color: white;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 700;
  }
  .title_count {
    .title {
      font-size: 20px
    }
    display: flex;
    justify-content: space-between;
  }
  .header .btn {
    display: flex;
    justify-content: flex-end;
  }
  .header .icon {
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
  .header .refresh {
    margin-right: 40px;
    cursor: pointer;
    &:hover{
      border-bottom: 1px solid #ffffff;
    }
  }
  .header .addBtn {
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
  .head tr {
    th {
    background-color: ${({ theme }) => theme.bgColors.listSecondHeader};
    color: ${({ theme }) => theme.fontColors.listHeader};
    font-weight: normal;
    padding: 12px 0;
    font-size: 13px;
    cursor: pointer;
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
`;

const Count = (type) => {
  const current = new Date();
  let [promotionTime, setPromotionTime] = useState(calRemainTime(current, getPromotionDate()));
  let [leagueTime, setLeagueTime] = useState(calRemainTime(current, getLeagueDate()));

  useInterval(() => {
    const current = new Date();
    setPromotionTime(calRemainTime(current, getPromotionDate()));
    setLeagueTime(calRemainTime(current, getLeagueDate()));
  }, 1000);

  if (type === 'score') {
    return <div>
      <span>리그전: {(leagueTime != null) ? prettierTime(leagueTime) : "wait.."}</span>
    </div>
  } else if (type === 'donations') {
    return <div>
      <span>승강전: {(promotionTime != null) ? prettierTime(promotionTime) : "wait.."}</span>
    </div>
  }
}

const RankingList = ({ title, type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { items, requestSort, sortConfig } = useSortableData(data);

  const onClick = async () => {
    try {
      setLoading2(true);
      const res = await axios.post(
        '/coc/clan/force/update', {
        tag: "%232Y2Y9YCUU"
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
          `/coc/clan/rank`, {
          tag: "%232Y2Y9YCUU"
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        let data = new Array(response.data.length);
        if (type === "donations") {
          for (let rank of response.data) {
            data[rank.donationRank - 1] = rank;
          }
        } else {
          for (let rank of response.data) {
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
    // eslint-disable-next-line
  }, [toggle]);

  console.log(data);
  return (
    <Container>
      <div className="header">
        <div className="title_count">
          <span className="title">{title}</span>
          <div className="count">
            {type !== null ? Count(type) : null}
          </div>
        </div>
        <div className="btn">
          {loading2 ? <i className="icon"><VscLoading className="loading" /></i> : null}
          <span className="refresh" onClick={onClick}>{loading2 ? '갱신중' : '갱신'}</span>
          <Link to={`/leaderboards/${type}`} className="addBtn">
            더보기
          </Link>
        </div>
      </div>
      <table>
        <Thead type={type} requestSort={requestSort} sortConfig={sortConfig} />
        {data && <Tbody type={type} items={items} loading={loading} list="ranking" />}
      </table>
    </Container>
  );
};

export default RankingList;