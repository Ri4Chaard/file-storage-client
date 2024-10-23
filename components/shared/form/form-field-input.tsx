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

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    form: any;
    label: string;
    description?: string;
    name: string;
    required?: boolean;
    className?: string;
}

export const FormFieldInput: React.FC<Props> = ({
    form,
    label,
    description,
    name,
    required,
    className,
    ...props
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
                        <Input {...field} {...props} />
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
