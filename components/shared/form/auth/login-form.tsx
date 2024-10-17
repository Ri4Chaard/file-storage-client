import React from "react";
import { cn } from "@/lib/utils";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "@/constants/auth-schemas";
import { signIn } from "next-auth/react";
import { FormInput } from "../form-input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";

interface Props {
    className?: string;
}

export const LoginForm: React.FC<Props> = ({ className }) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            login: "",
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
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 w-full"
                >
                    <FormInput name="login" label="Логін" required />

                    <FormInput
                        name="password"
                        type="password"
                        label="Пароль"
                        required
                    />

                    <Button size="lg" loading={form.formState.isSubmitting}>
                        Вхід
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
};
