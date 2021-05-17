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

export function copyText(txt) {
  let t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = txt;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
  alert(txt + "가 클립보드에 복사되었습니다.");
}