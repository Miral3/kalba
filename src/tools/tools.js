import { useEffect, useRef } from 'react';

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

export function expectedRole(role, idx, donations, rankData) {
  if (idx <= rankData.cutLine && donations >= 1000) {
    if (role === 'member') {
      if (rankData.adminCnt > 0) {
        rankData.adminCnt--;
        return '장로';
      }
    } else if (role === 'admin') {
      if (rankData.coLeaderCnt > 0) {
        rankData.coLeaderCnt--;
        return '공대';
      } else if (rankData.adminCnt > 0) {
        rankData.adminCnt--;
        return '장로';
      } else {
        return '멤버';
      }
    } else if (role === 'coLeader') {
      if (rankData.coLeaderCnt > 0) {
        rankData.coLeaderCnt--;
        return '공대';
      } else if (rankData.adminCnt > 0) {
        rankData.adminCnt--;
        return '장로';
      }
    } else if (role === 'leader') {
      rankData.cutLine++;
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

export function calRemainTime(curTime, closeTime) {
  return new Date(closeTime - curTime);
}

export function prettierTime(time) {
  return (time.getUTCMonth() > 0 ? "1개월 " : "") +(time.getUTCDate() - 1) + "일 " + time.getUTCHours() + "시간 후";
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
  return isEmpty(window.localStorage.getItem('token')) ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwb3Rpb25kZXYiLCJleHAiOjE2Mjk4ODk2NDksImlhdCI6MTYyOTg3MTY0OX0.1G0XJBpMy2QWiGiI9mIhfagKpIOi8uFM2k0hxZFKTyMo6vN3OE0B17Xa-u9k6u1aDpqWkTTLkaIFQAgJhkHd-g" : window.localStorage.getItem('token');
}

export function getNextPromotionDate(next) {
  let time = new Date();
  time.setMonth(time.getMonth() + next);
  time.setDate(1);
  time.setDate(time.getDate() - 1);
  while (time.getDay() !== 1) {
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

export function getPromotionDate() {
  let next = getNextPromotionDate(1);
  if (next < new Date()) {
    return getNextPromotionDate(2);
  } else {
    return next;
  }
}

export function getLeagueDate() {
  let next = getNextLeagueDate(0);
  if (next < new Date()) {
    return getNextLeagueDate(1);
  } else {
    return next;
  }
}
