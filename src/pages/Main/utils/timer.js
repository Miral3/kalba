export const calcRemainTime = (curTime, closeTime) => {
  return new Date(closeTime - curTime);
};

export const prettierTime = (time) => {
  return `${
    (time.getUTCMonth() > 0 ? "1개월 " : "") + (time.getUTCDate() - 1)
  }일 ${time.getUTCHours()}시간 후`;
};

const dateInfo = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const hour = now.getHours();
  const nextMonth = (month + 1) % 12;
  const nextYear = nextMonth === 0 ? year + 1 : year;
  return [year, month, date, hour, nextMonth, nextYear];
};

export const getPromotionDate = () => {
  const [year, month, date, hour, nextMonth, nextYear] = dateInfo();
  const penultimateDate = new Date(year, month + 1, -1).getDate();
  /*
    case1: 이번달 두번째 마지막 날 오후 10시가 지나지 않았다면
    이번 달 두번째 마지막 날  오후 10시
  */
  let next = new Date(year, month, penultimateDate, 22, 0);
  if (date >= penultimateDate) {
    if (date === penultimateDate && hour < 22) {
      return next;
    }
    /* 
      case2: 이번달 두번째 마지막 날 오후 10시가 지났다면
      다음 달 두번째 마지막 날 오후 10시
    */
    next = new Date(nextYear, nextMonth, penultimateDate, 22, 0);
  }
  return next;
};

export const getLeagueDate = () => {
  const [year, month, date, hour, nextMonth, nextYear] = dateInfo();
  /* 
    case1: 이번달 2일 오후 10시가 지나지 않았다면
    이번 달 2일 오후 10시
  */
  let next = new Date(year, month, 2, 22, 0);
  if (date >= 2) {
    if (date === 2 && hour < 22) {
      return next;
    }
    /* 
      case2: 이번달 2일 오후 10시가 지났다면
      다음 달 2일 오후 10시
    */
    next = new Date(nextYear, nextMonth, 2, 22, 0);
  }
  return next;
};
