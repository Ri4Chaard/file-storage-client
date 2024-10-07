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

interface Props {
    onUserAdded: () => void;
    onClose?: VoidFunction;
    className?: string;
}

export const RegisterForm: React.FC<Props> = ({ onUserAdded, onClose }) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await Api.auth.createUser(data);
            onUserAdded();
            onClose?.();
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
                <FormInput name="email" label="Email" required />

                <FormInput
                    name="password"
                    type="password"
                    label="Password"
                    required
                />
                <FormInput
                    name="confirmPassword"
                    type="password"
                    label="Confirm password"
                    required
                />
                <Button size="lg" loading={form.formState.isSubmitting}>
                    Add user
                </Button>
            </form>
        </FormProvider>
    );
};
