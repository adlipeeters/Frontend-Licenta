import axios from "axios";

const API_BASE_URL = "http://localhost:3500/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
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
    return response;
  },
  async (error) => {
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
