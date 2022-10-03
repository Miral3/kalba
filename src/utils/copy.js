export const copyText = (text) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(`${text}가 클립보드에 복사되었습니다.`);
      })
      .catch(() => {
        alert("다시 시도해주세요.");
      });
  } else {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert(`${text}가 클립보드에 복사되었습니다.`);
  }
};
