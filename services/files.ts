import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";
import { AxiosRequestConfig } from "axios";

export interface IFile {
    id: number;
    name: string;
    path: string;
    size: number;
    userId: number;
    folderId: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export const uploadFile = async (
    data: FormData,
    config?: AxiosRequestConfig
): Promise<IFile> => {
    return (
        await axiosInstance.post<IFile>(ApiRoutes.CREATE_FILE, data, config)
    ).data;
};

export const downloadFile = async (
    fileName: string,
    config?: AxiosRequestConfig
): Promise<Blob> => {
    return (
        await axiosInstance.get<Blob>(ApiRoutes.GET_FILE + fileName, config)
    ).data;
};
export const previewFile = async (
    fileName: string,
    config?: AxiosRequestConfig
): Promise<Blob> => {
    return (
        await axiosInstance.get<Blob>(ApiRoutes.PREVIEW_FILE + fileName, config)
    ).data;
};

export const deleteFile = async (fileId: number): Promise<Object> => {
    return (await axiosInstance.delete<Object>("/files/delete/" + fileId)).data;
};
