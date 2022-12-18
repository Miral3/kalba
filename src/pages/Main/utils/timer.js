export const calcRemainTime = (curTime, closeTime) => {
  return new Date(closeTime - curTime);
};

export const prettierTime = (time) => {
  return `${
    (time.getUTCMonth() > 0 ? "1개월 " : "") + (time.getUTCDate() - 1)
  }일 ${time.getUTCHours()}시간 후`;
};

export const getNextPromotionDate = (next) => {
  const time = new Date();
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
};

export const getNextLeagueDate = (next) => {
  const time = new Date();
  time.setMonth(time.getMonth() + next);
  time.setDate(2);
  time.setHours(22);
  time.setMinutes(0);
  time.setSeconds(0);
  time.setMilliseconds(0);
  return time;
};

export const getPromotionDate = () => {
  const next = getNextPromotionDate(1);
  if (next < new Date()) {
    return getNextPromotionDate(2);
  }
  return next;
};

export const getLeagueDate = () => {
  const next = getNextLeagueDate(0);
  if (next < new Date()) {
    return getNextLeagueDate(1);
  }
  return next;
};
