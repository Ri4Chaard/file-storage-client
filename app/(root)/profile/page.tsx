"use client";

import { AdminPanel } from "@/components/shared/admin-panel";
import { Container } from "@/components/shared/container";
import { UserPanel } from "@/components/shared/user-panel";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function ProfilePage() {
    const { data: session } = useSession();

    if (!session) {
        redirect("/");
    }

    return (
        <Container className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col">
                <h1 className="font-bold text-xl">{`Logged in as ${session.user.role}`}</h1>
                <AdminPanel className="my-3" />

                <Button
                    onClick={() => {
                        signOut();
                    }}
                >
                    Logout
                </Button>
            </div>
        </Container>
    );
}
