import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export interface Folder {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    userId: number;
}

export const createFolder = async (data: {
    name: string;
    userId: number;
    parentId?: number;
}): Promise<Folder> => {
    return (await axiosInstance.post<Folder>(ApiRoutes.CREATE_FOLDER, data))
        .data;
};

export const getFolders = async (
    userId: number,
    parentId?: number
): Promise<Folder[]> => {
    return (
        await axiosInstance.get<Folder[]>(ApiRoutes.FOLDERS, {
            params: { userId, parentId },
        })
    ).data;
};
