import axiosInstance from "../api";

export const ScheduledTransactions = async () => {
  const response = await axiosInstance.get("/scheduled-transactions");
  return response.data;
};

export const createScheduledTransaction = async (data: any) => {
  const response = await axiosInstance.post("/scheduled-transactions", data);
  return response.data;
};

export const updateScheduledTransaction = async (data: any) => {
  const response = await axiosInstance.put(
    `/scheduled-transactions/${data.id}`,
    data
  );
  return response.data;
};

export const deleteScheduledTransaction = async (data: any) => {
  const response = await axiosInstance.delete(
    `/scheduled-transactions/${data.id}`
  );
  return response.data;
};

export const getScheduledTransaction = async (id: number) => {
  const response = await axiosInstance.get("/scheduled-transactions/" + id);
  return response.data;
};

export const toggleTransactionStatus = async (id: number) => {
  const response = await axiosInstance.post(
    "/scheduled-transactions/toggleStatus/" + id
  );
  return response.data;
};
