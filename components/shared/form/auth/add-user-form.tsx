import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/store/user-store";
import { z } from "zod";
import { Api } from "@/services/api-client";
import { Form } from "@/components/ui/form";
import { FormFieldPhoneInput } from "../form-field-phone-input";
import { FormFieldInput } from "../form-field-input";

interface Props {
    onClose?: VoidFunction;
    className?: string;
}

export const AddUserForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<{ phone: string; orderId: string }>({
        resolver: zodResolver(
            z.object({
                phone: z
                    .string()
                    .length(10, { message: "Введіть номер телефону коректно" }),
                orderId: z
                    .string()
                    .length(6, { message: "Мінімум 6 символів" }),
            })
        ),
        defaultValues: {
            phone: "",
            orderId: "",
        },
    });

    const { fetchUsers } = useUserStore();

    const onSubmit = async (data: { phone: string; orderId: string }) => {
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
                <FormFieldPhoneInput
                    form={form}
                    name="phone"
                    label="Номер телефону"
                    required
                />
                <FormFieldInput
                    form={form}
                    name="orderId"
                    label="Номер замовлення"
                    required
                />

                <Button size="lg" loading={form.formState.isSubmitting}>
                    Додати
                </Button>
            </form>
        </Form>
    );
};
