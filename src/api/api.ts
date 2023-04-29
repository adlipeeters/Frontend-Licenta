import axios from "axios";
import { useCookies } from "react-cookie";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const API_BASE_URL = "http://localhost:3500/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    NProgress.start();
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  async (error) => {
    NProgress.done();
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // originalRequest._retry = true;
      // const token = await getNewToken();
      // if (token) {
      //   localStorage.setItem("token", token);
      //   originalRequest.headers.Authorization = `Bearer ${token}`;
      //   return axiosInstance(originalRequest);
      // } else {
      //   localStorage.removeItem("token");
      //   logoutUser();
      //   return Promise.reject(error);
      // }
      // localStorage.removeItem("auth_user_data");
      // window.location.reload();
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
