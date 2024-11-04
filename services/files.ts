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

export const getFile = async (
    fileName: string,
    config?: AxiosRequestConfig
): Promise<Blob> => {
    return (
        await axiosInstance.get<Blob>(ApiRoutes.GET_FILE + fileName, config)
    ).data;
};

export const deleteFile = async (fileId: number): Promise<Object> => {
    return (await axiosInstance.delete<Object>(ApiRoutes.DELETE_FILE + fileId))
        .data;
};

export const downloadSelected = async (
    selectedFiles: number[],
    config?: AxiosRequestConfig
): Promise<Blob> => {
    return (
        await axiosInstance.post(
            ApiRoutes.DOWNLOAD_SELECTED_FILES,
            { selectedFiles },
            config
        )
    ).data;
};
