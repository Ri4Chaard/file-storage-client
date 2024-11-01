import { User } from "./auth";
import { ApiRoutes } from "./constants";
import { IFile } from "./files";
import { Folder } from "./folders";
import axiosInstance from "./instance";

export const getAll = async (id?: number): Promise<User[]> => {
    return (
        await axiosInstance.get<User[]>(ApiRoutes.USERS, {
            params: { id },
        })
    ).data;
};

export const getUserDisk = async (
    userId: number,
    parentId?: number
): Promise<{ folders: Folder[]; files: IFile[] }> => {
    return (
        await axiosInstance.get<{ folders: Folder[]; files: IFile[] }>(
            ApiRoutes.USER_DISK,
            {
                params: { userId, parentId: parentId ? parentId : null },
            }
        )
    ).data;
};

export const addComment = async (data: {
    userId: number;
    comment: string | null;
}): Promise<{ user: User }> => {
    return (
        await axiosInstance.patch<{ user: User }>(ApiRoutes.ADD_COMMENT, data)
    ).data;
};
