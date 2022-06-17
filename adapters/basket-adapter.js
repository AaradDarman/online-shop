import http from "./xhr";
import config from "./xhr/config.json";

const syncBasket = (items) => {
  return http.post(`/api/basket/sync`, items);
};

const addToBasket = (payload) => {
  return http.post(`/api/basket/add-item`, payload);
};

const removeFromBasket = (payload) => {
  return http.post(`/api/basket/remove-item`, payload);
};

// eslint-disable-next-line
export default {
  syncBasket,
  addToBasket,
  removeFromBasket,
};
