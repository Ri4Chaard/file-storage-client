import React from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Api } from "@/services/api-client";
import { useAuthPageStore } from "@/store/auth-page-store";
import toast from "react-hot-toast";
import { Form } from "@/components/ui/form";
import { FormFieldPhoneInput } from "../form-field-phone-input";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/services/instance";

interface Props {
    className?: string;
}

export const SendCode: React.FC<Props> = ({ className }) => {
    const { setPhone, setExpiresAt, onChangeState, onSwitchType } =
        useAuthPageStore();
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
            setPhone(data.phone);
            await Api.code.sendCode(data).then((resp) => {
                if (resp.registered) {
                    onSwitchType();
                    toast.error("Ви вже зареєстровані!");
                } else if (resp.verified) {
                    onChangeState("register");
                } else if (resp.expiresAt) {
                    setExpiresAt(resp.expiresAt);
                    onChangeState("verify");
                } else {
                    onChangeState("verify");
                    toast.success("Код відправлено!");
                }
            });
        } catch (e: unknown) {
            const error = e as AxiosError<ErrorResponse>;
            if (error.response && error.response.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Виникла помилка при повторній відправки коду.");
            }
            console.log(error);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("flex flex-col gap-5", className)}
            >
                <FormFieldPhoneInput
                    form={form}
                    name="phone"
                    label="Номер телефону"
                    required
                />
                <Button
                    className="flex items-center gap-3"
                    size="lg"
                    loading={form.formState.isSubmitting}
                >
                    Надіслати код
                    <Send width={15} />
                </Button>
            </form>
        </Form>
    );
};
