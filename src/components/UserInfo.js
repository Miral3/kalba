import React from 'react';
import styled from 'styled-components';

const UserInfoBlock = styled.div`
  display:flex; 
  justify-content:space-around;
  padding: 8px 8px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  font-size: 15px;

  .icon {
    width: 25px;
    height: 25px;
  }
  .name {
    
  }
`;

const UserInfo = ({ info }) => {
  const { idx, leagueIcon, name, townHallLevel, donations, attackPower } = info;
  return (
    <UserInfoBlock>
      <span className="rank">{idx}</span>
      <span className="name">
        {leagueIcon && (
          // eslint-disable-next-line
          <img className="icon" src={leagueIcon} />
        )}
        <a href="/">{name}</a>
      </span>
      <span className="townHallLevel">{townHallLevel}</span>
      <span className="donations">{donations}</span>
      <span className="attackPower">{attackPower}</span>
    </UserInfoBlock>
  );
};

export default UserInfo;