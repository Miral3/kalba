export const translateRole = (role) => {
  const translateMap = {
    leader: "대표",
    coLeader: "공대",
    admin: "장로",
    member: "멤버",
  };
  return translateMap[role] ?? role;
};

export const translateLeague = (league) => {
  const name = league.split(" ")[0];
  const number = league.split(" ")[2];
  const translateMap = {
    Unranked: "랭크되지 않음",
    Bronze: `브론즈 리그 ${number}`,
    Silver: `실버 리그 ${number}`,
    Gold: `골드 리그 ${number}`,
    Crystal: `크리스털 리그 ${number}`,
    Master: `마스터 리그 ${number}`,
    Champion: `챔피언 리그 ${number}`,
    Titan: `타이탄 리그 ${number}`,
    Legend: "전설 리그",
  };
  return translateMap[name] ?? "존재하지 않는 리그";
};

export const translateOpenChatState = (state) => {
  const translateMap = {
    NOT_MEMBER: "X",
    MEMBER: "O",
    SUB_LEADER: "부방장",
    LEADER: "방장",
  };
  return translateMap[state] ?? "존재하지 않는 상태";
};

export const translateLeagueScore = (leagueScore) => {
  const SRC_END_POINT = "/img/coc/coc_League";
  switch (Math.round(leagueScore / 100)) {
    case 0:
    case 1:
    case 2:
    case 3: {
      // 0 ~ 399
      return "https://api-assets.clashofclans.com/leagues/72/e--YMyIexEQQhE4imLoJcwhYn6Uy8KqlgyY3_kFV6t4.png";
    }
    case 4: {
      // 400 ~ 499
      return `${SRC_END_POINT}/Bronze_league3.png`;
    }
    case 5: {
      // 500 ~ 599
      return `${SRC_END_POINT}/Bronze_league2.png`;
    }
    case 6:
    case 7: {
      // 600 ~ 799
      return `${SRC_END_POINT}/Bronze_league1.png`;
    }
    case 8:
    case 9: {
      // 800 ~ 999
      return `${SRC_END_POINT}/Silver_league3.png`;
    }
    case 10:
    case 11: {
      // 1000 ~ 1199
      return `${SRC_END_POINT}/Silver_league2.png`;
    }
    case 12:
    case 13: {
      // 1200 ~ 1399
      return `${SRC_END_POINT}/Silver_league1.png`;
    }
    case 14:
    case 15: {
      // 1400 ~ 1599
      return `${SRC_END_POINT}/Gold_league3.png`;
    }
    case 16:
    case 17: {
      // 1600 ~ 1799
      return `${SRC_END_POINT}/Gold_league2.png`;
    }
    case 18:
    case 19: {
      // 1800 ~ 1999
      return `${SRC_END_POINT}/Gold_league1.png`;
    }
    case 20:
    case 21: {
      // 2000 ~ 2199
      return `${SRC_END_POINT}/Crystal_league3.png`;
    }
    case 22:
    case 23: {
      // 2200 ~ 2399
      return `${SRC_END_POINT}/Crystal_league2.png`;
    }
    case 24:
    case 25: {
      // 2400 ~ 2599
      return `${SRC_END_POINT}/Crystal_league1.png`;
    }
    case 26:
    case 27: {
      // 2600 ~ 2799
      return `${SRC_END_POINT}/Master_league3.png`;
    }
    case 28:
    case 29: {
      // 2800 ~ 2999
      return `${SRC_END_POINT}/Master_league2.png`;
    }
    case 30:
    case 31: {
      // 3000 ~ 3199
      return `${SRC_END_POINT}/Master_league1.png`;
    }
    case 32:
    case 33:
    case 34: {
      // 3200 ~ 3499
      return `${SRC_END_POINT}/Champion_league3.png`;
    }
    case 35:
    case 36:
    case 37: {
      // 3500 ~ 3799
      return `${SRC_END_POINT}/Champion_league2.png`;
    }
    case 38:
    case 39:
    case 40: {
      // 3800 ~ 4099
      return `${SRC_END_POINT}/Champion_league1.png`;
    }
    case 41:
    case 42:
    case 43: {
      // 4100 ~ 4399
      return `${SRC_END_POINT}/Titan_league3.png`;
    }
    case 44:
    case 45:
    case 46: {
      // 4400 ~ 4699
      return `${SRC_END_POINT}/Titan_league2.png`;
    }
    case 47:
    case 48:
    case 49: {
      // 4700 ~ 4999
      return `${SRC_END_POINT}/Titan_league1.png`;
    }
    default: // 5000+
      return `${SRC_END_POINT}/Legend_league.png`;
  }
};
