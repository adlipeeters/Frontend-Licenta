import axiosInstance from "../api";

export const getNotifications = async () => {
  const response = await axiosInstance.get("/notifications");
  return response.data;
};

export const readAllNotifications = async () => {
  const response = await axiosInstance.post("/notifications/read-all");
  return response.data;
};
