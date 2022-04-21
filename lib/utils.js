const { DEFAULT_THUMBNAIL_SOURCE } = require("./constants");

module.exports = {
  formateDate: (d) => {
    d = new Date(d);
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
};
