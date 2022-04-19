export const formatTitle = (title: string | undefined) => {
  if (title === undefined) return "";
  let idx = 1;
  let result = title[0];
  while (idx < title.length) {
    if (title[idx].toLowerCase() === title[idx]) {
      result += title[idx];
    } else {
      // * 다음 값도 대문자이거나 없는 경우 <- 뛰어쓰기 아님
      if (
        idx === title.length - 1 ||
        title[idx + 1].toLowerCase() !== title[idx + 1]
      ) {
        result += title[idx] + title[idx + 1];
        idx++;
      }
      // * 그 외 <- 뛰어쓰기임
      else {
        result += " " + title[idx];
      }
    }
    idx++;
  }
  return result;
};
