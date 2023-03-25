import axiosInstance from "../api";
import { useNavigate } from "react-router-dom";

export const login = async (data: any) => {
  const response = await axiosInstance.post("/users/login", data);
  // if (response.data.userInfo) {
  //   localStorage.setItem("auth_user_data", JSON.stringify(response.data));
  // }
  return response.data;
};

export const register = async (data: any) => {
  const response = await axiosInstance.post("/users/register", data);
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get("/users/login");
  return response.data;
};

export const updateProfile = async (data: any) => {
  const response = await axiosInstance.put(`/users/${data.id}`, data);
  return response.data;
};

export const updateProfileImage = async (data: any) => {
  const response = await axiosInstance.post(`/users/upload`, data);
  return response.data;
};

export const changePassword = async (data: any) => {
  const response = await axiosInstance.post("/users/reset-password", data);
  return response.data;
};

export const getProfileImage = async (imgName: any) => {
  const response = await axiosInstance.get("/users/profile-image/" + imgName, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    responseType: "arraybuffer",
  });
  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });
  return URL.createObjectURL(blob);
};

export const getToken = () => {
  const userData = localStorage.getItem("auth_user_data");
  return userData;
};

export const logout = async () => {
  const response = await axiosInstance.post("/users/logout");
  return response.data;
};
