import { TFormRegisterValues } from "../constants/auth-schemas";
import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export interface User {
    id: number;
    login: string;
    phone: string;
    email: string;
    password: string;
    role: "ADMIN" | "USER";
    createdAt: Date;
    updatedAt: Date;
}

export const createUser = async (
    newUser: TFormRegisterValues
): Promise<User> => {
    return (await axiosInstance.post<User>(ApiRoutes.REGISTER, newUser)).data;
};
