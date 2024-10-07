import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export interface IFile {
    id: number;
    name: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    folderId: number | null;
    path: string;
}

export const uploadFile = async (data: FormData): Promise<IFile> => {
    return (await axiosInstance.post<IFile>(ApiRoutes.CREATE_FILE, data)).data;
};

export const getFiles = async (
    userId: number,
    folderId?: number
): Promise<IFile[]> => {
    const response = await axiosInstance.get(ApiRoutes.FILES, {
        params: { userId, folderId },
    });
    return response.data;
};
