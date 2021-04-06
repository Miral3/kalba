import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import LeaderBoards from './pages/LeaderBoards';
import axios from 'axios';

const UserListBlock = styled.div`
  width: 100%;
  margin-right: 12px;
  .block {
    box-sizing: border-box;
    padding-top: 3rem;
    width: 100%;
  }
  .block .blockTitle__addBtn {
    background-color: #5E4A3E;
    color: white;
    padding: 12px 16px;
    font-weight: 700;
  }
  .block .blockTitle__addBtn .addBtn {
    text-decoration: none;
    color: white;
    float:right;
  }
  .block .blockHead {
    display:flex;
    justify-content:space-around;
    background-color: #E6E2D6;
    color: #5E4A3E;
    font-weight: 400;
    padding: 12px 16px;
    font-size: 14px;
    .rank {
      width:15px;
    }
    .name {
      width: 100px;
    }
    .townHallLevel {

    }
    .donations{

    }
    .attackPower{

    }
  }
`;

const UserList = ({ type }) => {
  const [donationData, setDonationData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "/coc/clan/donations/rank", {
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
  }, []);

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
          <span className="title">{type}</span>
          <Link to="/leaderboards" className="addBtn">
            더보기
          </Link>
        </div>
        <div className="blockHead">
          <span className="rank">#</span>
          <span className="name">닉네임</span>
          <span className="townHallLevel">홀 레벨</span>
          <span className="donations">지원 수</span>
          <span className="attackPower">공격력</span>
        </div>
        {donationData.slice(0, 10).map((data, idx) => (
          <UserInfo key={data.tag} idx={idx + 1} info={data} />
        ))}
        <Route path="/leaderboards" component={LeaderBoards} />
      </div>
    </UserListBlock>
  );
};

export default UserList;