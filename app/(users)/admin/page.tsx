"use client";

import { AdminPanel } from "@/components/shared/admin/admin-panel";
import { Container } from "@/components/shared/container";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function AdminPage() {
    const { data: session } = useSession();
    if (session?.user.role !== "ADMIN") redirect("/");

    return (
        <Container className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col">
                <h1 className="font-bold text-xl text-center">АДМІН</h1>
                <AdminPanel className="my-3" />
            </div>
        </Container>
    );
}
