import React from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useAuthPageStore } from "@/store/auth-page-store";
import toast from "react-hot-toast";
import { Form } from "@/components/ui/form";
import { FormFieldInputOtp } from "../form-field-input-otp";
import { Api } from "@/services/api-client";

interface Props {
    className?: string;
}

export const VerifyCode: React.FC<Props> = ({ className }) => {
    const { phone, onChangeState } = useAuthPageStore();
    const form = useForm<{ code: string }>({
        resolver: zodResolver(
            z.object({
                code: z.string().length(4, { message: "Введіть код коректно" }),
            })
        ),
        defaultValues: {
            code: "",
        },
    });

    const onSubmit = async (data: { code: string }) => {
        try {
            await Api.code.verifyCode({ phone, ...data }).then((resp) => {
                if (resp.user) {
                    onChangeState("register");
                    toast.success("Код підтверджено!");
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Form {...form}>
            <form
                className={cn("flex flex-col items-center gap-5", className)}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormFieldInputOtp
                    name="code"
                    form={form}
                    length={4}
                    label="Верифікаційний код"
                    description="Будь ласка, введіть одноразовий пароль,
                                надісланий на ваш телефон."
                    required
                    className="flex flex-col items-center gap-3 w-3/4 text-center"
                />

                <Button type="submit">Підтвердити код</Button>
            </form>
        </Form>
    );
};
