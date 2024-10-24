import React, { useState } from "react";
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

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    form: any;
    label: string;
    description?: string;
    name: string;
    required?: boolean;
    className?: string;
}

export const FormFieldPhoneInput: React.FC<Props> = ({
    form,
    label,
    description,
    name,
    required,
    className,
    ...props
}) => {
    const [phone, setPhone] = useState("");

    const handlePhoneChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (value: string) => void
    ) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        const formattedPhone = value.replace(
            /(\d{3})(\d{3})(\d{2})(\d{2})/,
            "$1 $2 $3 $4"
        );
        setPhone(formattedPhone);
        onChange(value);
    };

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
                        <div className="flex items-center gap-2">
                            <span>+38</span>
                            <Input
                                {...field}
                                {...props}
                                value={phone}
                                onChange={(e) =>
                                    handlePhoneChange(e, field.onChange)
                                }
                                placeholder="012 345 6789"
                                maxLength={13}
                                className={cn("h-12 text-md", className)}
                            />
                        </div>
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
