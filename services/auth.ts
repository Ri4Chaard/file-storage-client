import { TFormRegisterValues } from "../constants/auth-schemas";
import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export interface User {
    id: number;
    phone: string;
    login: string | null;
    password: string | null;
    role: "ADMIN" | "USER";
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const createUser = async (data: {
    phone: string;
}): Promise<{ message: string; user: User }> => {
    return (
        await axiosInstance.post<{ message: string; user: User }>(
            ApiRoutes.ADD_USER,
            { ...data }
        )
    ).data;
};
export const register = async (
    phone: string,
    newUser: TFormRegisterValues
): Promise<{ message: string; user: User }> => {
    return (
        await axiosInstance.post<{ message: string; user: User }>(
            ApiRoutes.REGISTER,
            { phone, ...newUser }
        )
    ).data;
};
