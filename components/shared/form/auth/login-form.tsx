import React from "react";
import { cn } from "@/lib/utils";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "@/constants/auth-schemas";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "../form-field-input";
import { FormFieldPhoneInput } from "../form-field-phone-input";

interface Props {
    className?: string;
}

export const LoginForm: React.FC<Props> = ({ className }) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
    });

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn("credentials", {
                ...data,
                redirect: false,
            });

            if (!resp?.ok) {
                throw Error();
            }
            redirect("/profile");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={(cn(""), className)}>
            <h1 className="font-bold text-center mb-5">Вхід до застосунка</h1>
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
                        name="password"
                        type="password"
                        label="Пароль"
                        required
                    />

                    <Button size="lg" loading={form.formState.isSubmitting}>
                        Вхід
                    </Button>
                </form>
            </Form>
        </div>
    );
};
