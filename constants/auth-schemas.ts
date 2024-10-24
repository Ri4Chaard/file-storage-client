import { z } from "zod";

export const passwordSchema = z
    .string()
    .min(4, { message: "Введіть коректний пароль" });

export const formLoginSchema = z.object({
    phone: z
        .string()
        .length(10, { message: "Введіть номер телефону коректно" }),
    password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
    .merge(
        z.object({
            confirmPassword: passwordSchema,
        })
    )
    .refine((data) => data.password === data.confirmPassword, {
        message: " Паролі не співпадають",
        path: ["confirmPassword"],
    });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
