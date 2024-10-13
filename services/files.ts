import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";
import { AxiosRequestConfig } from "axios";

export interface IFile {
    id: number;
    name: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    folderId: number | null;
    path: string;
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
