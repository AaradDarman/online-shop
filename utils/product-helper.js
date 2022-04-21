import _ from "lodash";

const renameFile = (originalFile, newName) => {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
};

export const extractImages = (name, images) => {
  let renamedImages = images.flatMap((obj) =>
    obj.images.map((image, index) =>
      renameFile(
        image,
        `${_.kebabCase(name)}-${_.kebabCase(obj.color)}-${index + 1}`
      )
    )
  );
  return renamedImages;
};

export const getMinPrice = (inventory) => {
  let prices = inventory.map((obj) => obj.price);
  return Math.min(...prices);
};

export const applyDiscount = (discount, orginalPrice) => {
  return orginalPrice - (orginalPrice * discount) / 100;
};

export const getDiscountsRange = (discounts) => {
  let discountsPercents = discounts.map((obj) => obj.discount);
  console.log(discountsPercents);
  if (discountsPercents.length > 1) {
    let min = Math.min(...discountsPercents);
    let max = Math.max(...discountsPercents);
    return `%${min}-${max}`;
  } else {
    return `%${discountsPercents[0]}`;
  }
};
