import { getToken } from "../services/LocalStorage";

const interceptor = (axios) => {
  axios.interceptors.request.use(function (config) {
    const token = getToken();
    console.log(token);
    config.headers.Authorization = token;
    return config;
  });
};

export default interceptor;
