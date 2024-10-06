"use client";

import { Container } from "@/components/shared/container";
import { LoginForm } from "@/components/shared/form/auth/login-form";
import { Loader } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
    const { data: session } = useSession();

    if (useSession().status === "loading") {
        return (
            <Container className="flex items-center justify-center min-h-screen">
                <Loader className="w-5 h-5 animate-spin" />
            </Container>
        );
    }

    if (session) {
        if (session.user.role === "USER") {
            redirect(`/user/${session.user.id}`);
        }
        redirect("/profile");
    }

    return (
        <Container className="flex items-center justify-center min-h-screen">
            <LoginForm />
        </Container>
    );
}
