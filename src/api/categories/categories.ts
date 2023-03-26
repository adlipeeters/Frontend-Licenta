import axiosInstance from "../api";

export const getCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

export const createCategory = async (data: any) => {
  const response = await axiosInstance.post("/categories", data);
  return response.data;
};

export const updateCategory = async (data: any) => {
  const response = await axiosInstance.put(`/categories/${data.id}`, data);
  return response.data;
};

export const deleteCategory = async (data: any) => {
  const response = await axiosInstance.delete(`/categories/${data.id}`);
  return response.data;
};

export const getCategory = async (id: number) => {
  const response = await axiosInstance.get("/categories/" + id);
  return response.data;
};
