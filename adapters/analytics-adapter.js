import http from "./xhr";
import config from "./xhr/config.json";

const getRecentOrders = (search, sortBy, desc) => {
  return http.get(`${config.api}/order/get`, {
    params: { search, sortBy, desc },
  });
};

const getProductsStock = (search, sortBy, desc, skip = 0) => {
  return http.get(`${config.api}/products/stock`, {
    params: { search, sortBy, desc, skip },
  });
};

const getIncome = (range) => {
  return http.get(`${config.api}/products/income`, {
    params: { range },
  });
};

// eslint-disable-next-line
export default {
  getRecentOrders,
  getProductsStock,
  getIncome,
};
