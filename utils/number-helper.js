export const numberWithCommas = (number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const numberWithoutCommas = (number) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const compactNumber = (num) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "هزار" },
    { value: 1e6, symbol: "میلیون" },
    { value: 1e9, symbol: "میلیارد" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(1).replace(rx, "$1") + item.symbol
    : "0";
};
