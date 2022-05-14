export const numberWithCommas = (number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const numberWithoutCommas = (number) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const compactNumber = (number) => {
  const suffixes = ["", "هزار", "میلیون", "میلیارد"];
  const suffixNum = Math.floor(("" + number).length / 4);
  let shortValue = parseFloat(
    (suffixNum !== 0 ? number / Math.pow(1000, suffixNum) : number).toPrecision(
      2
    )
  );
  if (shortValue % 1 !== 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + " " + suffixes[suffixNum];
};
