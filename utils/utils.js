import dayjs from "dayjs";

export const returnDateFormat = (date) => {
  return dayjs(date).format("DD/MM/YY");
};

export const getDayDiference = (date) => {
  let date_2 = new Date();

  let difference = date.getTime() - date_2.getTime();

  return Math.ceil(difference / (1000 * 3600 * 24));
};

export const addDays = (days) => {
  console.log({ days });
  let result = new Date();
  result.setDate(result.getDate() + days);
  return result;
};
