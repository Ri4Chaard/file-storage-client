import React from "react";
import { cn } from "@/lib/utils";
import { FormProvider, useForm } from "react-hook-form";
import axiosInstance from "@/services/instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "../form-input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Api } from "@/services/api-client";

interface Props {
    className?: string;
}

export const SendCode: React.FC<Props> = ({ className }) => {
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

    const onSubmit = async (data: { phone: string }) => {
        try {
            await Api.code.sendCode(data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("flex flex-col gap-5", className)}
            >
                <FormInput name="phone" label="Номер телефону" required />
                <Button size="lg" loading={form.formState.isSubmitting}>
                    Зареєструватися
                    <ArrowRight />
                </Button>
            </form>
        </FormProvider>
    );
};
