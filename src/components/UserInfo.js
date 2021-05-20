import React from 'react';
import styled from 'styled-components';
import { bodyDataByType } from '../tools/tools';

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
  }
  .leader {
    color: #FFBB00 !important;
    
  }
  .coLeader {
    color: #FF7803 !important;
  }
  .admin {
    color: #FF1593 !important;
  }
  .side {
    color: ${({ theme }) => theme.fontColors.listInfo};
    width: 10%;
  }
`;

// const colorByRole = (name, role) => {
//   return <div>
//     <a className="name" href={`/profile/${name}`}>
//       {name}
//     </a>
//     <span className={"role " + role}>{translateRole(role, false)}</span>
//   </div>
// }

const UserInfo = ({ idx, info, type }) => {
  return (
    <UserInfoBlock>
      {bodyDataByType(type, info, idx)}
    </UserInfoBlock>
  );
};

export default UserInfo;