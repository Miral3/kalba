import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
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
  }
`;

const sampleInfo = {
  idx: '1',
  leagueIcon: 'https://api-assets.clashofclans.com/leagues/72/pSXfKvBKSgtvfOY3xKkgFaRQi0WcE28s3X35ywbIluY.png',
  name: '별별',
  townHallLevel: '12',
  donations: '1111',
  attackPower: '1322',
};

const UserList = ({ type }) => {
  const [apData, setApData] = useState(null);
  const [donationData, setDonationData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "/coc/clan/donations/rank", {
          id: "%232Y2Y9YCUU"
        });
        console.log(response);
        setDonationData(response);
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
          <a className="addBtn" href="/">더보기</a>
        </div>
        <div className="blockHead">
          <span className="rank">#</span>
          <span className="name">닉네임</span>
          <span className="townHallLevel">홀 레벨</span>
          <span className="donations">지원 수</span>
          <span className="attackPower">공격력</span>
        </div>
        <UserInfo info={sampleInfo} />
        <UserInfo info={sampleInfo} />
        <UserInfo info={sampleInfo} />
        <UserInfo info={sampleInfo} />
        <UserInfo info={sampleInfo} />
        <UserInfo info={sampleInfo} />
        <UserInfo info={sampleInfo} />
        <UserInfo info={sampleInfo} />
        <UserInfo info={sampleInfo} />
        <UserInfo info={sampleInfo} />
      </div>
    </UserListBlock>
  );
};

export default UserList;