import axios from "axios";
import auth from "../auth/authentication";

axios.interceptors.request.use(
  async (config) => {
    const userJwtToken = await auth.getJwtToken();
    if (userJwtToken) {
      config.headers.common["X-COGNITO-ID"] = userJwtToken;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (value) {
    return value;
  },
  (error) => {
    console.log("response interceptor error");
    console.log(error);

    return Promise.reject(error);
  }
);

const axiosExport = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
export default axiosExport;
