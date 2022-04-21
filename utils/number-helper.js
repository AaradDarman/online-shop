export const numberWithCommas = (number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const numberWithoutCommas = (number) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
