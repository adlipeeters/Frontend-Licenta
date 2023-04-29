import axiosInstance from "../api";

export const billReminders = async () => {
  const response = await axiosInstance.get("/bill-reminders");
  return response.data;
};

export const createBillReminder = async (data: any) => {
  const response = await axiosInstance.post("/bill-reminders", data);
  return response.data;
};

export const updateBillReminder = async (data: any) => {
  const response = await axiosInstance.put(`/bill-reminders/${data.id}`, data);
  return response.data;
};

export const deleteBillReminder = async (data: any) => {
  const response = await axiosInstance.delete(`/bill-reminders/${data.id}`);
  return response.data;
};

export const getBillReminder = async (id: number) => {
  const response = await axiosInstance.get("/bill-reminders/" + id);
  return response.data;
};

export const toggleBillReminder = async (id: number) => {
  const response = await axiosInstance.post(
    "/bill-reminders/toggleStatus/" + id
  );
  return response.data;
};
