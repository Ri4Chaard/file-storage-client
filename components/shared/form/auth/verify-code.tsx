import React, { useState, useEffect } from "react";
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
import { RefreshCwIcon, Send } from "lucide-react";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/services/instance";

interface Props {
    className?: string;
}

export const VerifyCode: React.FC<Props> = ({ className }) => {
    const { phone, expiresAt, onChangeState } = useAuthPageStore();
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

    const [timeLeft, setTimeLeft] = useState(
        expiresAt
            ? Math.max(
                  0,
                  Math.floor(
                      (new Date(expiresAt).getTime() - Date.now()) / 1000
                  )
              )
            : 600
    );

    // Таймер
    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            toast.error("Код истек. Пожалуйста, запросите новый код.");
        }
    }, [timeLeft]);

    const onSubmit = async (data: { code: string }) => {
        try {
            await Api.code.verifyCode({ phone, ...data }).then((resp) => {
                if (resp.user) {
                    onChangeState("register");
                    toast.success("Код підтверджено!");
                }
            });
        } catch (e: unknown) {
            const error = e as AxiosError<ErrorResponse>;
            if (error.response && error.response.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Помилка верифікації.");
            }
            console.log(error);
        }
    };

    const resendCode = async () => {
        try {
            await Api.code.sendCode({ phone });
            setTimeLeft(600); // Перезапуск таймера на 10 минут
            toast.success("Код повторно отправлен!");
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

    // Форматирование оставшегося времени (минуты и секунды)
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
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

                <div className="text-xs text-gray-600">
                    Дійсний: {formatTime(timeLeft)}
                </div>

                <button
                    className={cn(
                        "flex items-center gap-2 group underline text-xs",
                        { "pointer-events-none opacity-50": timeLeft > 0 }
                    )}
                    type="button"
                    onClick={resendCode}
                    disabled={timeLeft > 0} // Блокируем повторную отправку до истечения времени
                >
                    Відправити повторно
                    <div className="flex relative">
                        <Send width={24} height={24} />
                        <RefreshCwIcon
                            width={12}
                            height={12}
                            className="absolute group-hover:animate-spin self-end -right-2"
                        />
                    </div>
                </button>
            </form>
        </Form>
    );
};
