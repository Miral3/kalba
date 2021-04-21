import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { VscLoading } from 'react-icons/vsc'
import styled from 'styled-components';

import UserInfo from './UserInfo';
import axios from 'axios';

const UserListBlock = styled.div`
  width: 100%;
  margin-right: 12px;
  .block {
    box-sizing: border-box;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    width: 100%;
  }
  .block .blockTitle__addBtn {
    background-color: #5E4A3E;
    color: white;
    padding: 12px 16px;
    font-weight: 700;
  }
  .block .blockTitle__addBtn .btn {
    float: right;
  }
  .block .blockTitle__addBtn .icon {
    margin-right:5px;
  }
  .loading {
    animation: rotate_image 10s linear infinite;
    transform-origin: 50% 50%;
    @keyframes rotate_image{
	    100% {
    	transform: rotate(360deg);
      }
    }
  } 
  .block .blockTitle__addBtn .refresh {
    margin-right: 40px;
    cursor: pointer;
    &:hover{
      border-bottom: 1px solid #ffffff;
    }
  }
  .block .blockTitle__addBtn .addBtn {
    text-decoration: none;
    color: white;
    &:hover{
      border-bottom: 1px solid #ffffff;
    }
  }
  .block .blockHead {
    display:flex;
    justify-content:space-around;
    background-color: #E6E2D6;
    color: #5E4A3E;
    font-weight: 400;
    padding: 12px 0;
    font-size: 14px;
    text-align: center;
    .rank {
      width:10%;
      padding-left:3px;
    }
    .name {
      text-align:left;
      width: 45%;
      padding-left: 16px;
    }
    .trophies,
    .townHallLevel,
    .donations,
    .attackPower {
      width: 20%;
      padding-right:4px;
    }
  }
`;

const RankingList = ({ title, type }) => {
  const [donationData, setDonationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [toggle, setToggle] = useState(false);

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
  }, [toggle]);

  console.log(loading2);
  if (loading) {
    return <UserListBlock>대기 중...</UserListBlock>
  }
  if (!donationData) {
    return null;
  }

  return (
    <UserListBlock>
      <div className="block">
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
        <div className="blockHead">
          <span className="rank">#</span>
          <span className="name">이름</span>
          <span className="trophies">트로피</span>
          <span className="townHallLevel">홀</span>
          <span className="attackPower">공격력</span>
          <span className="donations">지원량</span>
        </div>
        {donationData.slice(0, 10).map((data, idx) => (
          <UserInfo key={data.tag} idx={idx + 1} info={data} />
        ))}
      </div>
    </UserListBlock>
  );
};

export default RankingList;