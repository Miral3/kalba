import React from 'react';
import styled from 'styled-components';

const UserInfoBlock = styled.div`
  display:flex;
  padding: 8px 0;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  font-size: 15px;
  align-items: center;
  text-align: center;
  .rank {
    width:10%;
    margin-right:5px;
  }
  .names {
    display: flex;
    align-items: center;
    width: 45%;
    .icon {
      width: 25px;
      height: 25px;
      margin-right: 2px;
    }
    .name {
      font-size: 12px;
      text-decoration: none;
      margin-right: 2px;
      color: black;
      &:hover{
      border-bottom: 1px solid black;
      }
    }
  }
  .trophies,
  .townHallLevel,
  .donations,
  .attackPower  {
    width: 20%;
  }
`;

const UserInfo = ({ idx, info }) => {
  console.log(info);
  const { league, name, trophies, townHallLevel, donations, yonghaScore } = info;
  return (
    <UserInfoBlock>
      <span className="rank">{idx}</span>
      <span className="names">
        {league && (
          // eslint-disable-next-line
          <img className="icon" src={league.iconTiny} />
        )}
        <a className="name" href={`/profile/${name}`}>
          {name}
        </a>
      </span>
      <span className="trophies">{trophies}</span>
      <span className="townHallLevel">{townHallLevel}</span>
      <span className="attackPower">{yonghaScore}</span>
      <span className="donations">{donations}</span>
    </UserInfoBlock>
  );
};

export default UserInfo;