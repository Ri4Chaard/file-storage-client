import { TFormRegisterValues } from "../constants/auth-schemas";
import { ApiRoutes } from "./constants";
import { IFile } from "./files";
import { Folder } from "./folders";
import axiosInstance from "./instance";

interface LoginLogs {
    id: number;
    userId: number;
    loggedInAt: Date;
}

export interface User {
    id: number;
    phone: string;
    orderId: string;
    comment: string;
    files?: IFile[];
    folders?: Folder[];
    loginLogs?: LoginLogs[];
    password: string | null;
    role: "ADMIN" | "USER";
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const createUser = async (data: {
    phone: string;
    orderId: string;
}): Promise<{ message: string; user: User }> => {
    return (
        await axiosInstance.post<{ message: string; user: User }>(
            ApiRoutes.ADD_USER,
            { ...data }
        )
    ).data;
};
export const register = async (
    newUser: TFormRegisterValues
): Promise<{ message: string; user: User }> => {
    return (
        await axiosInstance.post<{ message: string; user: User }>(
            ApiRoutes.REGISTER,
            newUser
        )
    ).data;
};

export const restorePassword = async (data: {
    phone: string;
}): Promise<{ message: string }> => {
    return (
        await axiosInstance.post<{ message: string }>(
            ApiRoutes.RESTORE_PASSWORD,
            data
        )
    ).data;
};
