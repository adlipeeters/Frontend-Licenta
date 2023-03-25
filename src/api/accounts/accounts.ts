import axiosInstance from "../api";

export const getAccounts = async () => {
  const response = await axiosInstance.get("/accounts");
  return response.data;
};

export const createAccount = async (data: any) => {
  const response = await axiosInstance.post("/accounts", data);
  return response.data;
};
