import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import axios from 'axios';

const UserListBlock = styled.div`
  display: block;
  height: auto !important;
  margin-top: 1rem !important;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 3rem;
  position: relative !important;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
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
    return <UserListBlock>대기 중...</UserListBlock>
  }
  if (!data) {
    return null;
  }
  return (
    <div>
      <UserListBlock>
        <div className="block">
          <div className="blockHead">
            <span className="rank">#</span>
            <span className="name">이름</span>
            <span className="trophies">트로피</span>
            <span className="townHallLevel">홀</span>
            <span className="attackPower">공격력</span>
            <span className="donations">지원량</span>
          </div>
          {data.map((data, idx) => (
            <UserInfo key={data.tag} idx={idx + 1} info={data} />
          ))}
        </div>
      </UserListBlock>
    </div>
  );
};

export default UserList;