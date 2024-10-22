import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export const sendCode = async (data: {
    phone: string;
}): Promise<{ message: string }> => {
    return (
        await axiosInstance.post<{ message: string }>(ApiRoutes.SEND_CODE, {
            ...data,
        })
    ).data;
};
export const verifyCode = async (data: {
    phone: string;
    code: string;
}): Promise<{ user: string; message: string }> => {
    return (
        await axiosInstance.post<{ user: string; message: string }>(
            ApiRoutes.VERIFY_CODE,
            {
                ...data,
            }
        )
    ).data;
};
