import http from "./xhr";
import config from "./xhr/config.json";

const login = (user) => {
  return http.post(`/api/auth/login`, user);
};

const signup = (user) => {
  return http.post(`/api/user/signup`, user);
};

const addNewAddress = (addressInfo) => {
  return http.post(`/api/user/add-address`, addressInfo);
};

const verify = (verificationCode) => {
  return http.post(`/api/user/verify`, verificationCode);
};

const resend = (userId) => {
  return http.post(`/api/user/resend-verification-code`, userId);
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
  signup,
  verify,
  resend,
  getUserData,
  getUserOrders,
  getUserOrdersCount,
  addNewAddress,
};
