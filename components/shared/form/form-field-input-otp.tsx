import React from "react";
import { cn } from "@/lib/utils";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RequiredSymbol } from "./require-symbol";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

interface Props {
    form: any;
    label: string;
    description?: string;
    name: string;
    length: number;
    required?: boolean;
    className?: string;
}

export const FormFieldInputOtp: React.FC<Props> = ({
    form,
    label,
    description,
    name,
    length,
    required,
    className,
}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    {label && (
                        <FormLabel>
                            {label} {required && <RequiredSymbol />}
                        </FormLabel>
                    )}
                    <FormControl>
                        <InputOTP maxLength={length} {...field}>
                            <InputOTPGroup>
                                {[...Array(length)].map((_, index) => (
                                    <InputOTPSlot key={index} index={index} />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    </FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
