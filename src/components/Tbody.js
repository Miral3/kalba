import React, { useState } from 'react';

import styled from 'styled-components';

import { translateRole, expectedRole, isEmpty } from '../tools/tools';
import axios from "axios";

const Container = styled.tbody`
  .blank {
    border: ${({ theme }) => theme.borderColors.list};
    background-color: ${({ theme }) => theme.bgColors.listContents};
    height: 42px;    
  }
  .memberState {
      height: 36px;
  }
`

const Tr = styled.tr`
  border: ${({ theme }) => theme.borderColors.list};
  background-color: ${({ theme }) => theme.bgColors.listContents};
  font-size: 12px;
  align-items: center;
  text-align: center;
  td {
    padding: 8px 5px;
    animation-name: fade;
    animation-fill-mode: forwards;
    animation-duration: 0.1s;
    animation-direction: alternate;
    @keyframes fade{
      0%,45% {
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }
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
  .side {
    color: ${({ theme }) => theme.fontColors.listInfo};
    width: 10%;
  }
`;


const Tbody = (props) => {
  const data = props.data;
  const type = props.type;
  const [checkedAttackState] = useState(isEmpty(props.checked) ? new Set() : props.checked.checkedAttackState);
  const [checkedWarningState] = useState(isEmpty(props.checked) ? new Set() : props.checked.checkedWarningState);
  // 추후에 exclusionList 참고해서 cutLine, coLeaderCnt, adminCnt감소
  const rankData = {
    cutLine: 13, // 14 
    coLeaderCnt: 5, // 6
    adminCnt: 8 // 8
  }

  const handleChange = (e) => {
    let { className, name, id } = e.target;
    let idx = parseInt(name) + 1;
    if (className === 'attack') {
      if (checkedAttackState.has(idx)) {
        checkedAttackState.delete(idx);
      } else {
        checkedAttackState.add(idx);
      }
    } else {
      if (checkedWarningState.has(idx)) {
        checkedWarningState.delete(idx);
      } else {
        checkedWarningState.add(idx);
      }
    }
    updateChange("#" + id, checkedAttackState.has(idx), checkedWarningState.has(idx));
  }

  const updateChange = async (tag, attackState, warningState) => {
    await axios.put(
      '/coc/clan/member/state',
      [{
        tag: tag,
        attackState: attackState,
        warningState: warningState
      }],
      {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        if (res.status === 400) {
          alert("예상하지 못한 에러가 발생하여 서버에 저장하지 못하였습니다. 다시 한번 시도해주세요.");
        }
      }).catch(e => {
        alert("예상하지 못한 에러가 발생하여 서버에 저장하지 못하였습니다. 다시 한번 시도해주세요.");
      });
  }

  const tdByType = (idx, val) => {
    const linkTagArg = val.tag.substr(1);
    if (type === 'memberState') {
      return <>
        <td className="rank">{idx}</td>
        <td className="names">
          {!props.admin && <span className="hiddenRank">#{idx}</span>}
          <a className="name" href={`/profile/${linkTagArg}`}>
            {val.nickname}
          </a>
        </td>
        <td className="register side">{val.member ? "O" : "X"}</td>
        <td className="quizScore side">{val.quizScore}</td>
        <td className="league side">
          <input className="attack" type="checkbox" name={idx - 1} id={linkTagArg} defaultChecked={checkedAttackState.has(idx)} onChange={event => handleChange(event)} />
          <input className="warning" type="checkbox" name={idx - 1} id={linkTagArg} defaultChecked={checkedWarningState.has(idx)} onChange={event => handleChange(event)} />
        </td>
      </>
    } else if (type === 'score' || type === 'donations') {
      return <>
        <td className="rank">{idx}</td>
        <td className="names">
          <span className="hiddenRank">#{idx}</span>
          {val.league && (
            // eslint-disable-next-line
            <img className="icon" src={val.league.iconTiny} />
          )}
          <a className="name" href={`/profile/${linkTagArg}`}>
            {val.name}
          </a>
        </td>
        {(() => {
          if (type === 'score') {
            return <>
              <td className="trophies side">{val.trophies}</td>
              <td className="townHallLevel side">{val.townHallLevel}</td>
              <td className="attackPower side">{val.yonghaScore}</td>
            </>
          } else if (type === 'donations') {
            return <>
              <td className="donations side">{val.donations}</td>
              <td className="currentRole side">{translateRole(val.role)}</td>
              <td className="expectedRole side">{expectedRole(val.role, idx, val.donations, rankData, val.tag)}</td>
            </>
          }
        })()
        }
      </>
    }
  }

  return (
    <Container>
      {props.list === 'ranking' ?
        data.slice(0, 10).map((item, idx) => (
          <Tr key={item.tag}>
            {tdByType(idx + 1, item, rankData)}
          </Tr>
        )) :
        data.map((item, idx) => (
          <Tr key={item.tag}>
            {tdByType(idx + 1, item, rankData)}
          </Tr>
        ))
      }
    </Container>
  )
}

export default Tbody;