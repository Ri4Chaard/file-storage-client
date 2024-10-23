import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/store/user-store";
import { z } from "zod";
import { Api } from "@/services/api-client";
import { FormFieldInput } from "../form-field-input";
import { Form } from "@/components/ui/form";

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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 w-full"
            >
                <FormFieldInput
                    form={form}
                    name="phone"
                    label="Номер телефону"
                    required
                />

                <Button size="lg" loading={form.formState.isSubmitting}>
                    Додати
                </Button>
            </form>
        </Form>
    );
};
