export function isEmpty(value) {
  return value === "" || value == null || (typeof value == "object" && !Object.keys(value).length);
}

export function translateRole(engTxt) {
  switch (engTxt) {
    case "leader":
      return "대표";
    case "coLeader":
      return "공동대표";
    case "admin":
      return "장로";
    default:
      return "멤버";
  }
}