import axiosInstance from "../api";

export const getTransactions = async () => {
  const response = await axiosInstance.get("/transactions");
  return response.data;
};

export const createTransaction = async (data: any) => {
  const response = await axiosInstance.post("/transactions", data);
  return response.data;
};

export const updateTransaction = async (data: any) => {
  const response = await axiosInstance.put(`/transactions/${data.id}`, data);
  return response.data;
};

export const deleteTransaction = async (data: any) => {
  const response = await axiosInstance.delete(`/transactions/${data.id}`);
  return response.data;
};

export const getTransaction = async (id: number) => {
  const response = await axiosInstance.get("/transactions/" + id);
  return response.data;
};
