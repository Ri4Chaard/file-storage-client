import { User } from "./auth";
import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export const getAll = async (): Promise<User[]> => {
    return (await axiosInstance.get<User[]>(ApiRoutes.USERS)).data;
};
