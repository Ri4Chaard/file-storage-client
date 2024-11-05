"use client";

import { Container } from "@/components/shared/container";
import { LoginForm } from "@/components/shared/form/auth/login-form";
import { Registration } from "@/components/shared/registration";
import { Button } from "@/components/ui/button";
import { useAuthPageStore } from "@/store/auth-page-store";
import { Disc3 } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
    const { data: session } = useSession();
    const { authType, onSwitchType, onChangeState } = useAuthPageStore();

    if (useSession().status === "loading") {
        return (
            <Container className="flex items-center justify-center min-h-screen">
                <Disc3 className="w-5 h-5 animate-spin" />
            </Container>
        );
    }

    if (session) {
        if (session.user.role === "USER") {
            redirect(`/user/${session.user.id}`);
        } else if (session.user.role === "ADMIN") {
            redirect("/admin");
        } else {
            redirect("/");
        }
    }

    return (
        <div className="flex gap-5 items-center justify-center min-h-screen">
            <div className="relative flex basis-2/3 min-h-screen bg-film bg-cover">
                <div className="absolute w-full h-full bg-black/40"></div>
            </div>
            <div className="basis-1/3 flex flex-col justify-center items-center px-5">
                {authType === "login" ? <LoginForm /> : <Registration />}
                <div className="flex items-center w-full my-5">
                    <span className="flex-1 border border-primary/10"></span>
                    <h2 className="text-sm mx-2 font-bold text-primary/50">
                        {authType === "login"
                            ? "Ще не зареєструвалися?"
                            : "Вже зареєструвалися?"}
                    </h2>
                    <span className="flex-1 border border-primary/10"></span>
                </div>
                <Button
                    variant="outline"
                    className="flex mb-5"
                    onClick={onSwitchType}
                >
                    {authType === "login" ? "Зареєструватися" : "Увійти"}
                </Button>

                {authType === "login" && (
                    <Button
                        variant="ghost"
                        className="flex"
                        onClick={() => {
                            onSwitchType();
                            onChangeState("password_restore");
                        }}
                    >
                        Забули пароль?
                    </Button>
                )}
            </div>
        </div>
    );
}
