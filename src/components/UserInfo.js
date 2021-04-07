import React from 'react';
import styled from 'styled-components';

const UserInfoBlock = styled.div`
  display:flex;
  padding: 8px 8px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  font-size: 15px;
  align-items: center;
  .rank {
    width:5%;
    padding-left:10px;
  }
  .nickname {
    display: flex;
    align-items: center;
    width: 50%;
    .icon {
      width: 25px;
      height: 25px;
      padding-right:5px;
    }
    .name {
      font-size: 12px;
      text-decoration: none;
      color: black;
    }
  }
  .townHallLevel  {
    width: 15%
  }
  .donations {
    width: 15%
  }
  .attackPower{
    width: 15%
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