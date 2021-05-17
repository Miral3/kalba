import React from 'react';
import styled from 'styled-components';
import { translateRole } from '../tools/tools';

const UserInfoBlock = styled.tr`
  border: ${({ theme }) => theme.borderColors.list};
  background-color: ${({ theme }) => theme.bgColors.listContents};
  font-size: 12px;
  align-items: center;
  text-align: center;

  td {
    padding: 8px 5px;
  }
  .rank {
    display: table-cell;
    width: 10%;
    color: ${({ theme }) => theme.fontColors.listName};
    @media (max-width: 425px) {
      display: none;
    }
  }
  .names {
    display: flex;
    text-align: left;
    align-items: center;
    /* width: 60%; */
    .hiddenRank{
      display: none;
      color: #666;
      font-size: 11px;
      @media (max-width: 425px) {
        display: table-cell;
      }
    }
    .icon {
      width: 25px;
      height: 25px;
      margin-right: 2px;
    }
    .name {
      text-decoration: none;
      margin-right: 2px;
      color: ${({ theme }) => theme.fontColors.listName};
      &:hover{
        border-bottom: ${({ theme }) => theme.borderColors.listName};
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
  .attackPower {
    color: ${({ theme }) => theme.fontColors.listInfo};
    width: 10%;
  }
`;

const colorByRole = (name, role) => {
  return <div>
    <a className="name" href={`/profile/${name}`}>
      {name}
    </a>
    <span className={"role " + role}>{translateRole(role)}</span>
  </div>
}

const UserInfo = ({ idx, info }) => {
  const { league, name, role, trophies, townHallLevel, donations, yonghaScore } = info;

  return (
    <UserInfoBlock>
      <td className="rank">{idx}</td>
      <td className="names">
        <span className="hiddenRank">#{idx}</span>
        {league && (
          // eslint-disable-next-line
          <img className="icon" src={league.iconTiny} />
        )}
        {colorByRole(name, role)}
      </td>
      <td className="trophies">{trophies}</td>
      <td className="townHallLevel">{townHallLevel}</td>
      <td className="attackPower">{yonghaScore}</td>
      <td className="donations">{donations}</td>
    </UserInfoBlock>
  );
};

export default UserInfo;