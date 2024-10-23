import { ApiRoutes } from "./constants";
import axiosInstance from "./instance";

export const sendCode = async (data: {
    phone: string;
}): Promise<{ registered?: boolean; verified?: boolean; message: string }> => {
    return (
        await axiosInstance.post<{
            registered?: boolean;
            verified?: boolean;
            message: string;
        }>(ApiRoutes.SEND_CODE, {
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
