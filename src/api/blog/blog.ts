import axiosInstance from "../api";

export const getArticles = async () => {
    const response = await axiosInstance.get("/blogs/all-articles");
    return response.data;
};

export const createArticle = async (data: any) => {
    const response = await axiosInstance.post("/blogs", data);
    return response.data;
};

export const updateArticle = async (data: any) => {
    const response = await axiosInstance.put(`/blogs/${data.id}`, data);
    return response.data;
};

export const deleteArticle = async (data: any) => {
    const response = await axiosInstance.delete(`/blogs/${data.id}`);
    return response.data;
};

export const getArticle = async (id: number) => {
    const response = await axiosInstance.get("/blogs/" + id);
    return response.data;
};
