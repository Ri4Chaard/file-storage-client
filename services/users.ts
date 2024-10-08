import { User } from "./auth";
import { ApiRoutes } from "./constants";
import { IFile } from "./files";
import { Folder } from "./folders";
import axiosInstance from "./instance";

export const getAll = async (): Promise<User[]> => {
    return (await axiosInstance.get<User[]>(ApiRoutes.USERS)).data;
};

export const getUserDisk = async (
    userId: number,
    parentId?: number
): Promise<{ folders: Folder[]; files: IFile[] }> => {
    return (
        await axiosInstance.get<{ folders: Folder[]; files: IFile[] }>(
            ApiRoutes.USER_DISK,
            {
                params: { userId, parentId },
            }
        )
    ).data;
};
