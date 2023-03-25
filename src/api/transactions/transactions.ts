import axiosInstance from "../api";

export const getTransactions = async () => {
  const response = await axiosInstance.get("/transactions");
  return response.data;
};
