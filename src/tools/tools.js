export function isEmpty(value) {
  return value === 0 || value === "" || value == null || (typeof value == "object" && !Object.keys(value).length);
}

export function translateRole(engTxt, isProfilePage) {
  switch (engTxt) {
    case "leader":
      return "대표";
    case "coLeader":
      return isProfilePage ? "공동대표" : "공대";
    case "admin":
      return "장로";
    default:
      return isProfilePage ? "멤버" : "";
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
  if (idx <= cutLine) {
    if (role === 'member') {
      if (adminCnt > 0) {
        adminCnt--;
        return '장로';
      }
    } else if (role === 'admin') {
      if (donations > 500) {
        if (coLeaderCnt > 0) {
          coLeaderCnt--;
          return '공대';
        } else {
          if (adminCnt > 0) {
            adminCnt--;
            return '장로';
          }
        }
      } else {
        return '멤버';
      }
    } else if (role === 'coLeader') {
      if (donations < 1000) {
        return '멤버';
      } else {
        if (coLeaderCnt > 0) {
          coLeaderCnt--;
          return '공대';
        } else {
          if (adminCnt > 0) {
            adminCnt--;
            return '장로';
          }
        }
      }
    } else if (role === 'leader') {
      cutLine++;
      return '-';
    }
  } else {
    if (role === 'member') {
      return '멤버';
    } else if (role === 'admin') {
      return '멤버';
    } else if (role === 'coLeader') {
      if (donations > 1000) {
        return '장로';
      } else {
        return '멤버';
      }
    } else if (role === 'leader') {
      return '-';
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
      <td className="currentRole side">{translateRole(role, true)}</td>
      <td className="expectedRole side">{expectedRole(role, idx, donations)}</td>
    </>
  }
}