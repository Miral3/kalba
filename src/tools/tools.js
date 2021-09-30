import React, { useEffect, useRef } from 'react';

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
    return <thead className="head">
      <tr>
        <th className="rank">#</th>
        <th className="name">이름</th>
        <th className="trophies side">트로피</th>
        <th className="townHallLevel side">홀</th>
        <th className="attackPower side">공격력</th>
      </tr>
    </thead>
  } else if (type === 'donations') {
    return <thead className="head">
      <tr>
        <th className="rank">#</th>
        <th className="name">이름</th>
        <th className="dontaions side">지원량</th>
        <th className="currentRole side">현재직책</th>
        <th className="expectedRole side">예상직책</th>
      </tr>
    </thead>
  } else if (type === 'userInfo') {
    return <>
      <thead className="head multiple">
        <tr>
          <th className="rank">#</th>
          <th className="name">이름</th>
          <th className="register side">회원가입</th>
          <th className="quizScore side">퀴즈 점수</th>
          <th className="league side">리그전<br /> 미공 | 경고</th>
        </tr>
      </thead>
      {/* <thead className="subhead">
        <tr>
          <th className="rank"></th>
          <th className="name"></th>
          <th className="register side"></th>
          <th className="detail noAttack"></th>
          <th className="detail caution">미공 | 경고</th>
        </tr>
      </thead> */}
    </>
  }
}

export function bodyDataByType(type, info, idx) {
  const { league, name, tag, role, trophies, townHallLevel, donations, yonghaScore } = info;
  const linkTagArg=tag.substr(1);
  if (type === 'score') {
    return <>
      <td className="rank">{idx}</td>
      <td className="names">
        <span className="hiddenRank">#{idx}</span>
        {league && (
          // eslint-disable-next-line
          <img className="icon" src={league.iconTiny} />
        )}
        <a className="name" href={`/profile/${linkTagArg}`}>
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
        <a className="name" href={`/profile/${linkTagArg}`}>
          {name}
        </a>
      </td>
      <td className="donations side">{donations}</td>
      <td className="currentRole side">{translateRole(role)}</td>
      <td className="expectedRole side">{expectedRole(role, idx, donations)}</td>
    </>
  }
}

export function calRemainTime(curTime, closeTime) {
  return new Date(closeTime - curTime);
}

export function prettierTime(time) {
  return (time.getUTCDate() - 1) + "일 " + time.getUTCHours() + "시간 후";
}

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

export function isLogin() {
  return !isEmpty(getLoginUser());
}

export function logout() {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('name');
}

export function getLoginUser() {
  return window.localStorage.getItem('name');
}

export function getLoginUserNickname() {
  return window.localStorage.getItem('nickname');
}

export function getLoginToken() {
  return isEmpty(window.localStorage.getItem('token'))?"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwb3Rpb25kZXYiLCJleHAiOjE2Mjk4ODk2NDksImlhdCI6MTYyOTg3MTY0OX0.1G0XJBpMy2QWiGiI9mIhfagKpIOi8uFM2k0hxZFKTyMo6vN3OE0B17Xa-u9k6u1aDpqWkTTLkaIFQAgJhkHd-g":window.localStorage.getItem('token');
}

export function getNextPromotionDate(next) {
  let time = new Date();
  time.setMonth(time.getMonth() + next);
  time.setDate(1);
  time.setDate(time.getDate() - 1);
  while(time.getDay() !== 1) {
    time.setDate(time.getDate() - 1);
  }
  time.setDate(time.getDate() - 1);
  time.setHours(22);
  time.setMinutes(0);
  time.setSeconds(0);
  time.setMilliseconds(0);
  return time;
}

export function getNextLeagueDate(next) {
  let time = new Date();
  time.setMonth(time.getMonth() + next);
  time.setDate(2);
  time.setHours(22);
  time.setMinutes(0);
  time.setSeconds(0);
  time.setMilliseconds(0);
  return time;
}

export function getPromotionDate(){
  let next = getNextPromotionDate(1);
  if(next < new Date()) {
    return getNextPromotionDate(2);
  } else {
    return next;
  }
}

export function getLeagueDate(){
  let next = getNextLeagueDate(0);
  if(next < new Date()) {
    return getNextLeagueDate(1);
  } else {
    return next;
  }
}
