import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export interface Folder {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    userId: number;
    parentId: number | undefined;
    children: Folder[];
}

export const createFolder = async (data: {
    name: string;
    userId: number;
    parentId?: number;
}): Promise<Folder> => {
    return (await axiosInstance.post<Folder>(ApiRoutes.CREATE_FOLDER, data))
        .data;
};

export const deleteFolder = async (folderId: number): Promise<Object> => {
    return (await axiosInstance.delete<Object>("/folder/delete/" + folderId))
        .data;
};
