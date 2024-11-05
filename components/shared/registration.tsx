import React from "react";
import { cn } from "@/lib/utils";
import { RegisterForm } from "./form/auth/register-form";

import { VerifyCode } from "./form/auth/verify-code";
import { SendCode } from "./form/auth/send-code";
import { useAuthPageStore } from "@/store/auth-page-store";

interface Props {
    className?: string;
}

export const Registration: React.FC<Props> = ({ className }) => {
    const { registrationState } = useAuthPageStore();
    return (
        <div className={cn("", className)}>
            {registrationState === "send" && <SendCode />}
            {registrationState === "verify" && <VerifyCode />}
            {registrationState === "register" && <RegisterForm />}
            {/* <VerifyCode /> */}
        </div>
    );
};
