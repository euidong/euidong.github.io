const { DEFAULT_THUMBNAIL_SOURCE } = require("./constants");

module.exports = {
  formatDate: (d) => {
    d = new Date(d.replace(/-/g, "/"));
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const hour = d.getHours().toString().padStart(2, "0");
    const min = d.getMinutes().toString().padStart(2, "0");
    return `${year}년 ${month}월 ${date}일 ${hour}:${min}`;
  },
  formatImage: (src) => {
    if (src === undefined) {
      return DEFAULT_THUMBNAIL_SOURCE;
    } else if (src.slice(0, 8) === "/images/") {
      return process.env.PUBLIC_URL + src;
    } else {
      return src;
    }
  },
  formatTitle: (title) => {
    if (title === undefined) return "";
    let idx = 0;
    let result = "";
    while (idx < title.length) {
      if (title[idx].toLowerCase() === title[idx]) {
        result += title[idx];
      } else {
        // * 끝 문자인 경우
        if (idx === title.length - 1) {
          result += title[idx];
          idx++;
        }
        // * 다음 값도 대문자이거나 없는 경우 <- 뛰어쓰기 아님
        else if (title[idx + 1].toLowerCase() !== title[idx + 1]) {
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
  },
};
