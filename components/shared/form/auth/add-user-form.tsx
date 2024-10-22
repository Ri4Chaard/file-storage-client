import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FormInput } from "../form-input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/store/user-store";
import { z } from "zod";
import { Api } from "@/services/api-client";

interface Props {
    onClose?: VoidFunction;
    className?: string;
}

export const AddUserForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<{ phone: string }>({
        resolver: zodResolver(
            z.object({
                phone: z
                    .string()
                    .length(10, { message: "Введіть номер телефону коректно" }),
            })
        ),
        defaultValues: {
            phone: "",
        },
    });

    const { fetchUsers } = useUserStore();

    const onSubmit = async (data: { phone: string }) => {
        try {
            await Api.auth.createUser({ ...data });
            fetchUsers();
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
                <FormInput name="phone" label="Номер телефону" required />

                <Button size="lg" loading={form.formState.isSubmitting}>
                    Додати
                </Button>
            </form>
        </FormProvider>
    );
};
