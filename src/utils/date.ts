export const formateDate = (d: Date | string): string => {
  d = new Date(d);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes().toString().padStart(2, "0");
  return `${year}년 ${month}월 ${date}일 ${hour}:${min}`;
};
