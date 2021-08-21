import React, { useEffect, useRef } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

export function isEmpty(value) {
  return value === 0 || value === "" || value == null || (typeof value == "object" && !Object.keys(value).length);
}

export function translateRole(engTxt) {
  switch (engTxt) {
    case "leader":
      return "대표";
    case "coLeader":
      return "공대"
    case "admin":
      return "장로";
    default:
      return "멤버";
  }
}

export function copyText(txt) {
  let t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = txt;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
  alert(txt + "가 클립보드에 복사되었습니다.");
}

export function isMobile() {
  return /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone|webOS/i.test(navigator.userAgent);
}

let cutLine, coLeaderCnt, adminCnt;

export function expectedRole(role, idx, donations) {
  if (idx <= cutLine && donations >= 1000) {
    if (role === 'member') {
      if (adminCnt > 0) {
        adminCnt--;
        return '장로';
      }
    } else if (role === 'admin') {
      if (coLeaderCnt > 0) {
        coLeaderCnt--;
        return '공대';
      } else if (adminCnt > 0) {
        adminCnt--;
        return '장로';
      } else {
        return '멤버';
      }
    } else if (role === 'coLeader') {
      if (coLeaderCnt > 0) {
        coLeaderCnt--;
        return '공대';
      } else if (adminCnt > 0) {
        adminCnt--;
        return '장로';
      }
    } else if (role === 'leader') {
      cutLine++;
      return '-';
    }
  } else {
    if (role === 'leader') {
      return '-';
    } else {
      return '멤버';
    }
  }
}

export function headerDataByType(type) {
  cutLine = 11;
  coLeaderCnt = 4;
  adminCnt = 7;
  if (type === 'score') {
    return <tr>
      <th className="rank">#</th>
      <th className="name">이름</th>
      <th className="trophies side">트로피</th>
      <th className="townHallLevel side">홀</th>
      <th className="attackPower side">공격력</th>
    </tr>
  } else if (type === 'donations') {
    return <tr>
      <th className="rank">#</th>
      <th className="name">이름</th>
      <th className="dontaions side">지원량</th>
      <th className="currentRole side">현재직책</th>
      <th className="expectedRole side">예상직책</th>
    </tr>
  }
}

export function bodyDataByType(type, info, idx) {
  const { league, name, role, trophies, townHallLevel, donations, yonghaScore } = info;

  if (type === 'score') {
    return <>
      <td className="rank">{idx}</td>
      <td className="names">
        <span className="hiddenRank">#{idx}</span>
        {league && (
          // eslint-disable-next-line
          <img className="icon" src={league.iconTiny} />
        )}
        <a className="name" href={`/profile/${name}`}>
          {name}
        </a>
      </td>
      <td className="trophies side">{trophies}</td>
      <td className="townHallLevel side">{townHallLevel}</td>
      <td className="attackPower side">{yonghaScore}</td>
    </>
  } else if (type === 'donations') {
    return <>
      <td className="rank">{idx}</td>
      <td className="names">
        <span className="hiddenRank">#{idx}</span>
        {league && (
          // eslint-disable-next-line
          <img className="icon" src={league.iconTiny} />
        )}
        <a className="name" href={`/profile/${name}`}>
          {name}
        </a>
      </td>
      <td className="donations side">{donations}</td>
      <td className="currentRole side">{translateRole(role)}</td>
      <td className="expectedRole side">{expectedRole(role, idx, donations)}</td>
    </>
  }
}

export function getLeagueStartDate(time) {
  let startDate = new Date(time.getFullYear(), time.getMonth(), 2);
  startDate.setHours(22);
  let curTime = new Date();
  if (startDate <= curTime) {
    startDate.setMonth(curTime.getMonth() + 1);
    return getLeagueStartDate(startDate);
  }
  return startDate;
}

export function getPromotionDate(time) {
  let lastMonDate = new Date(time.getFullYear(), time.getMonth(), 1);
  lastMonDate.setMonth(lastMonDate.getMonth() + 1);
  lastMonDate.setDate(lastMonDate.getDate() - lastMonDate.getDay());
  lastMonDate.setHours(22);
  let curTime = new Date();
  if (lastMonDate <= curTime) {
    lastMonDate.setMonth(curTime.getMonth() + 1);
    return getPromotionDate(lastMonDate);
  }
  return lastMonDate;
}

export function calRemainTime(curTime, closeTime) {
  return new Date(closeTime - curTime);
}

export function getRemainTime(time) {
  return (time.getUTCDate() - 1) + "일 " + time.getUTCHours() + "시간 후";
}

// export function transformNumber(Number) {
//   return Number < 10 ? `0${Number}` : Number;
// }

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function isLogin(){
  return !isEmpty(getLoginUser());
}

export function logout(){
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('name');
}

export function getLoginUser(){
  return window.localStorage.getItem('name');
}

export function getLoginUserNickname(){
  return window.localStorage.getItem('nickname');
}

export function getLoginToken(){
  return window.localStorage.getItem('token');
}