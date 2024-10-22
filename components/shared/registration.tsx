import React from "react";
import { cn } from "@/lib/utils";
import { RegisterForm } from "./form/auth/register-form";

import { VerifyCode } from "./form/auth/verify-code";
import { SendCode } from "./form/auth/send-code";

interface Props {
    className?: string;
}

export const Registration: React.FC<Props> = ({ className }) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-5 h-96 overflow-auto border p-5",
                className
            )}
        >
            <hr className="my-5" />
            <SendCode />
            <hr className="my-5" />
            <VerifyCode />
            <hr className="my-5" />

            <RegisterForm />
        </div>
    );
};
