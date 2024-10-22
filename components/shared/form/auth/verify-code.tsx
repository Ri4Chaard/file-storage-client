import React from "react";
import { cn } from "@/lib/utils";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "@/services/instance";
import { FormInput } from "../form-input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Api } from "@/services/api-client";

interface Props {
    className?: string;
}

export const VerifyCode: React.FC<Props> = ({ className }) => {
    const form = useForm<{ phone: string; code: string }>({
        resolver: zodResolver(
            z.object({
                phone: z
                    .string()
                    .length(10, { message: "Введіть номер телефону коректно" }),
                code: z.string().length(4, { message: "Введіть код коректно" }),
            })
        ),
        defaultValues: {
            phone: "",
            code: "",
        },
    });

    const onSubmit = async (data: { phone: string; code: string }) => {
        try {
            await Api.code.verifyCode(data);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <FormProvider {...form}>
            <form
                className={cn("flex flex-col gap-5", className)}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormInput name="phone" label="Телефон" required />
                <FormInput name="code" label="Код веріфікації" required />
                <Button size="lg" loading={form.formState.isSubmitting}>
                    Підтвердити
                    <ArrowRight />
                </Button>
            </form>
        </FormProvider>
    );
};
