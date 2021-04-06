import React from 'react';
import styled from 'styled-components';

const UserInfoBlock = styled.div`
  display:flex; 
  justify-content:space-around;
  padding: 8px 8px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  font-size: 15px;
  align-items: center;
  .rank {
    width:15px;
  }
  .nickname {
    display: flex;
    align-items: center;
    width: 100px;
    .name {
      font-size: 12px;
    }
  }
  .icon {
    width: 25px;
    height: 25px;
  }
  .nickname .name {
    text-decoration: none;
    color: black;
  }
`;

const UserInfo = ({ idx, info }) => {
  const { league, name, townHallLevel, donations, yonghaScore } = info;

  return (
    <UserInfoBlock>
      <span className="rank">{idx}</span>
      <span className="nickname">
        {league && (
          // eslint-disable-next-line
          <img className="icon" src={league.iconTiny} />
        )}
        <a className="name" href="/">{name}</a>
      </span>
      <span className="townHallLevel">{townHallLevel}</span>
      <span className="donations">{donations}</span>
      <span className="attackPower">{yonghaScore}</span>
    </UserInfoBlock>
  );
};

export default UserInfo;