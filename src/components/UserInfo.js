import React from 'react';
import styled from 'styled-components';

const UserInfoBlock = styled.div`
  display: flex;
  padding: 8px 0;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  font-size: 15px;
  align-items: center;
  text-align: center;
  @media (max-width: 335px) {
    font-size: 14px;
  }
  @media (max-width: 310px) {
    font-size: 13px;
  }
  .rank {
    width:10%;
    margin-right:5px;
  }
  .names {
    display: flex;
    align-items: center;
    width: 45%;
    font-size: 12px;
    @media (max-width: 335px) {
        font-size: 11px;
    }
    @media (max-width: 310px) {
      font-size: 10px;
    }
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
    .coLeader {
      /* text-shadow: -1px 0px #b303ff,
        1px 0px #b303ff,
        0px -1px #b303ff,
        0px 1px #b303ff;
      color: #fff;
      
      font-weight: 700; */

    }
    .admin {
      /* text-shadow: -1px 0px #0100ff,
        1px 0px #0100ff,
        0px -1px #0100ff,
        0px 1px #0100ff;
      color: #fff;
      font-weight: 700; */
    }
  }
  .trophies,
  .townHallLevel,
  .donations,
  .attackPower  {
    width: 20%;
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