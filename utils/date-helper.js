import dayjs from "dayjs";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

export const fromNow = (date) => {
  let d = moment(date);
  return d.fromNow();
};

export const getTimeOnly = (date) => {
  let inputDate = dayjs(date);
  return inputDate.format("HH:mm");
};

export const getPersianDate = (date) => {
  let time = dayjs(date);
  let m = moment(time.format("YYYY/MM/DD"), "YYYY/MM/DD");
  let dateString = m.format("jYYYY/jMM/jDD");
  return dateString;
};

export const getPersianDateWithTime = (date) => {
  let time = dayjs(date);
  let m = moment(time.format("YYYY/MM/DD HH:mm"), "YYYY/MM/DD HH:mm");
  let dateString = m.format("jYYYY/jMM/jDD HH:mm");
  return dateString;
};

export const getDateOnly = (date) => {
  let time = dayjs(date);
  let dateString = time.format("YYYY/MM/DD");
  return dateString;
};
