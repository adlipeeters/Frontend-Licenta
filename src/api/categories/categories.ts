import axiosInstance from "../api";

export const getCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};
