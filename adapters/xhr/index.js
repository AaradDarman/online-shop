import axios from "axios";
import { toast } from "react-toastify";
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
  if (!expectetErrors) {
    toast.error("مشکلی از سمت سرور رخ داده است.", {
      position: "top-right",
      closeOnClick: true,
    });
    console.log("problem from server");
    return;
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
