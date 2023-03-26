import axiosInstance from "../api";

export const getAccounts = async () => {
  const response = await axiosInstance.get("/accounts");
  return response.data;
};

export const createAccount = async (data: any) => {
  const response = await axiosInstance.post("/accounts", data);
  return response.data;
};
export const updateAccount = async (data: any) => {
  const response = await axiosInstance.put(`/accounts/${data.id}`, data);
  return response.data;
};

export const getAccount = async (id: number) => {
  const response = await axiosInstance.get("/accounts/" + id);
  return response.data;
};
