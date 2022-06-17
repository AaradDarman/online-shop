import axios from "axios";
import { toast } from "react-toastify";

import { resetCart } from "redux/slices/cart";
import { resetUser } from "redux/slices/user";
import store from "redux/store";
// import { getToken } from "../../utils/token-helper";

// export const setHeader = (token) => {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

// axios.defaults.headers.post["Content-Type"] = "application/json";
// getToken("token").then((tk) => {
//   if (tk) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${tk}`;
//   }
// });

axios.interceptors.response.use(null, (error) => {
  const expectetErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (error?.response?.status === 401 && !_.isEmpty(store.getState().user.user)) {
    store.dispatch(resetUser());
    store.dispatch(resetCart());
  }

  if (!expectetErrors) {
    toast.error("مشکلی از سمت سرور رخ داده است.", {
      position: "top-right",
      closeOnClick: true,
    });
    console.log("problem from server");
    return Promise.reject(error);
  }

  return Promise.reject(error);
});
// eslint-disable-next-line
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
