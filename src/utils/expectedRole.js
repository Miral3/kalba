/* eslint-disable no-param-reassign */
/**
 * @Todo db에서 불러오도록 수정
 */
const exclusionList = [
  {
    name: "Miral",
    tag: "#LJLLLQLQR",
    staticRole: "coLeader",
  },
];

export function expectedRole(role, idx, donations, tag, count) {
  const exclusion = exclusionList.find((info) => info.tag === tag);
  if (exclusion) {
    return "-";
  }

  if (idx < count.cutLine && donations >= 1000) {
    if (role === "member") {
      if (count.adminCnt > 0) {
        count.adminCnt -= 1;
        return "장로";
      }
    } else if (role === "admin") {
      if (count.coLeaderCnt > 0) {
        count.coLeaderCnt -= 1;
        return "공대";
      }
      if (count.adminCnt > 0) {
        count.adminCnt -= 1;
        return "장로";
      }
      return "멤버";
    } else if (role === "coLeader") {
      if (count.coLeaderCnt > 0) {
        count.coLeaderCnt -= 1;
        return "공대";
      }
      if (count.adminCnt > 0) {
        count.adminCnt -= 1;
        return "장로";
      }
    } else if (role === "leader") {
      count.cutLine += 1;
      return "-";
    }
  } else if (role === "leader") {
    return "-";
  } else {
    return "멤버";
  }
}
