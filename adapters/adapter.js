import http from "./xhr";
import config from "./xhr/config.json";

const createProduct = (product) => {
  return http.post(`${config.api}/product/create`, product);
};

const getProducts = (page = 1, sortBy) => {
  return http.get(`${config.api}/products`, { params: { page, sortBy } });
};

const deleteProduct = (id) => {
  return http.delete(`${config.api}/product/${id}`);
};

const editProduct = (updatedProduct) => {
  return http.put(`${config.api}/product/edit/${updatedProduct._id}`, {
    product: updatedProduct,
  });
};
// eslint-disable-next-line
export default {
  createProduct,
  getProducts,
  deleteProduct,
  editProduct,
};
