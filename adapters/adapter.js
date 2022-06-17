import http from "./xhr";
import config from "./xhr/config.json";

const createProduct = (product) => {
  return http.post(`${config.api}/product/create`, product);
};

const getProducts = (page = 1, sortBy) => {
  return http.get(`${config.api}/products`, { params: { page, sortBy } });
};

const getProduct = (id) => {
  return http.get(`${config.api}/product/${id}`);
};

const deleteProduct = (id) => {
  return http.delete(`${config.api}/product/${id}`);
};

const editProduct = (updatedProduct) => {
  return http.put(`${config.api}/product/edit/${updatedProduct._id}`, {
    product: updatedProduct,
  });
};

const getBasket = (userId) => {
  return http.get(`${config.api}/basket/${userId}`);
};

// eslint-disable-next-line
export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  editProduct,
  getBasket,
};
