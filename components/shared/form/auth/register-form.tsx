import React from "react";
import { cn } from "@/lib/utils";
import { FormProvider, useForm } from "react-hook-form";
import {
    formRegisterSchema,
    TFormRegisterValues,
} from "@/constants/auth-schemas";
import { FormInput } from "../form-input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Api } from "@/services/api-client";
import { useUserStore } from "@/store/user-store";
import axiosInstance from "@/services/instance";

interface Props {
    onClose?: VoidFunction;
    className?: string;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            login: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await Api.auth.register(data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 w-full"
            >
                <FormInput name="login" label="Логін" required />
                <FormInput name="phone" label="Номер телефону" required />
                <FormInput name="email" label="Email" />

                <FormInput
                    name="password"
                    type="password"
                    label="Пароль"
                    required
                />
                <FormInput
                    name="confirmPassword"
                    type="password"
                    label="Підтвердіть пароль"
                    required
                />
                <Button size="lg" loading={form.formState.isSubmitting}>
                    Підтвердити
                </Button>
            </form>
        </FormProvider>
    );
};
