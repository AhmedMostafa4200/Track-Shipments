import axios from "axios";

const baseUrl = "https://tracking.bosta.co/";

// Request interceptor
axios.interceptors.request.use(
  function (config) {
    config.baseURL = baseUrl;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (res) => res,
  (err) => err
);

export default axios;
