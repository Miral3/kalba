import React from 'react';
import styled from 'styled-components';

const UserInfoBlock = styled.div`
  display: flex;
  padding: 8px 0;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  font-size: 12px;
  align-items: center;
  text-align: center;

  .rank {
    display: table-cell;
    width:10%;
    margin-right:5px;
    @media (max-width: 500px) {
      display: none;
    }
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
      text-decoration: none;
      margin-right: 2px;
      color: black;
      &:hover{
      border-bottom: 1px solid black;
      }
    }
    .role {
      margin-left: 2px;
      padding: 2px;
      color: white;
      border-radius: 4px;
      word-break: keep-all;
      line-height: 200%;
      font-weight: 600;
    }
    .leader {
        background-color: #FFBB00;
      }
      .coLeader {
        background-color: #FF7803;
      }
      .admin {
        background-color: #FF1593;
      }
  }
  .trophies,
  .townHallLevel,
  .donations,
  .attackPower  {
    width: 15%;
  }
`;

const colorByRole = (name, role) => {
  switch (role) {
    case "leader":
      return <div>
        <a className="name" href={`/profile/${name}`}>
          {name}
        </a>
        <span className="role leader">대표</span>
      </div>
    case "coLeader":
      return <div>
        <a className="name" href={`/profile/${name}`}>
          {name}
        </a>
        <span className="role coLeader">공대</span>
      </div>
    case "admin":
      return <div>
        <a className="name" href={`/profile/${name}`}>
          {name}
        </a>
        <span className="role admin">장로</span>
      </div>
    case "member":
      return <a className="name" href={`/profile/${name}`}>
        {name}
      </a>
    default:
      break;
  }
}

const UserInfo = ({ idx, info }) => {
  const { league, name, role, trophies, townHallLevel, donations, yonghaScore } = info;

  return (
    <UserInfoBlock>
      <span className="rank">{idx}</span>
      <span className="names">
        {league && (
          // eslint-disable-next-line
          <img className="icon" src={league.iconTiny} />
        )}
        {colorByRole(name, role)}
      </span>
      <span className="trophies">{trophies}</span>
      <span className="townHallLevel">{townHallLevel}</span>
      <span className="attackPower">{yonghaScore}</span>
      <span className="donations">{donations}</span>
    </UserInfoBlock>
  );
};

export default UserInfo;