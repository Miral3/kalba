export const translateRole = (role) => {
  switch (role) {
    case "leader":
      return "대표";
    case "coLeader":
      return "공대";
    case "admin":
      return "장로";
    default:
      return "멤버";
  }
};

export const translateLeague = (league) => {
  const name = league.split(" ")[0];
  const number = league.split(" ")[2];
  switch (name) {
    case "Unranked":
      return "랭크되지 않음";
    case "Bronze":
      return `브론즈 리그 ${number}`;
    case "Silver":
      return `실버 리그 ${number}`;
    case "Gold":
      return `골드 리그 ${number}`;
    case "Crystal":
      return `크리스털 리그 ${number}`;
    case "Master":
      return `마스터 리그 ${number}`;
    case "Champion":
      return `챔피언 리그 ${number}`;
    case "Titan":
      return `타이탄 리그 ${number}`;
    case "Legend":
      return "전설 리그";
    default:
      break;
  }
};

export const translateLeagueScore = (leagueScore) => {
  const SRC_END_POINT = "/img/coc/coc_League";
  switch (Math.round(leagueScore / 100)) {
    case (0, 1, 2, 3): {
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
    case (6, 7): {
      // 600 ~ 799
      return `${SRC_END_POINT}/Bronze_league1.png`;
    }
    case (8, 9): {
      // 800 ~ 999
      return `${SRC_END_POINT}/Silver_league3.png`;
    }
    case (10, 11): {
      // 1000 ~ 1199
      return `${SRC_END_POINT}/Silver_league2.png`;
    }
    case (12, 13): {
      // 1200 ~ 1399
      return `${SRC_END_POINT}/Silver_league1.png`;
    }
    case (14, 15): {
      // 1400 ~ 1599
      return `${SRC_END_POINT}/Gold_league3.png`;
    }
    case (16, 17): {
      // 1600 ~ 1799
      return `${SRC_END_POINT}/Gold_league2.png`;
    }
    case (18, 19): {
      // 1800 ~ 1999
      return `${SRC_END_POINT}/Gold_league1.png`;
    }
    case (20, 21): {
      // 2000 ~ 2199
      return `${SRC_END_POINT}/Crystal_league3.png`;
    }
    case (22, 23): {
      // 2200 ~ 2399
      return `${SRC_END_POINT}/Crystal_league2.png`;
    }
    case (24, 25): {
      // 2400 ~ 2599
      return `${SRC_END_POINT}/Crystal_league1.png`;
    }
    case (26, 27): {
      // 2600 ~ 2799
      return `${SRC_END_POINT}/Master_league3.png`;
    }
    case (28, 29): {
      // 2800 ~ 2999
      return `${SRC_END_POINT}/Master_league2.png`;
    }
    case (30, 31): {
      // 3000 ~ 3199
      return `${SRC_END_POINT}/Master_league1.png`;
    }
    case (32, 34): {
      // 3200 ~ 3499
      return `${SRC_END_POINT}/Champion_league3.png`;
    }
    case (35, 37): {
      // 3500 ~ 3799
      return `${SRC_END_POINT}/Champion_league2.png`;
    }
    case (38, 40): {
      // 3800 ~ 4099
      return `${SRC_END_POINT}/Champion_league1.png`;
    }
    case (41, 43): {
      // 4100 ~ 4399
      return `${SRC_END_POINT}/Titan_league3.png`;
    }
    case (44, 46): {
      // 4400 ~ 4699
      return `${SRC_END_POINT}/Titan_league2.png`;
    }
    case (47, 49): {
      // 4700 ~ 4999
      return `${SRC_END_POINT}/Titan_league1.png`;
    }
    default: // 5000+
      break;
  }
};
