import http from "./xhr";
import config from "./xhr/config.json";

const login = (user) => {
  return http.post(`/api/auth/login`, user);
};

const getUserData = () => {
  return http.get(`/api/user/user-data`);
};

const getUserOrders = (userId, activeTab = "in-progress") => {
  return http.get(`/api/order/${userId}?activeTab=${activeTab}`);
};

const getUserOrdersCount = (userId) => {
  return http.get(`/api/order/get-orders-count/${userId}`);
};

// eslint-disable-next-line
export default {
  login,
  getUserData,
  getUserOrders,
  getUserOrdersCount,
};
