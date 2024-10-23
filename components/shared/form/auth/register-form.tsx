import React from "react";
import { useForm } from "react-hook-form";
import {
    formRegisterSchema,
    TFormRegisterValues,
} from "@/constants/auth-schemas";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Api } from "@/services/api-client";
import { useAuthPageStore } from "@/store/auth-page-store";
import toast from "react-hot-toast";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "../form-field-input";

interface Props {
    onClose?: VoidFunction;
    className?: string;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
    const { phone, onChangeState, onSwitchType } = useAuthPageStore();
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            login: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await Api.auth.register(phone, data).then((resp) => {
                if (resp.user) {
                    onChangeState("send");
                    onSwitchType();
                    toast.success("Ви успішно зареєструвалися!");
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 w-full"
            >
                <FormFieldInput
                    form={form}
                    name="login"
                    label="Логін"
                    required
                />

                <FormFieldInput
                    form={form}
                    name="password"
                    type="password"
                    label="Пароль"
                    required
                />
                <FormFieldInput
                    form={form}
                    name="confirmPassword"
                    type="password"
                    label="Підтвердіть пароль"
                    required
                />
                <Button size="lg" loading={form.formState.isSubmitting}>
                    Зареєструватися
                </Button>
            </form>
        </Form>
    );
};
