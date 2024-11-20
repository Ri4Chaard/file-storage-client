"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { AddUserModal } from "./add-user-modal";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface Props {
    className?: string;
}

export const AdminPanel: React.FC<Props> = ({ className }) => {
    const [openAddUserModal, setOpenAddUserModal] = React.useState(false);

    return (
        <div className={cn("flex flex-col gap-5 w-full", className)}>
            <Link href="/admin-dashboard">
                <Button>Переглянути користувачів</Button>
            </Link>
            <Button onClick={() => setOpenAddUserModal(true)} variant="outline">
                Додати користувача
            </Button>

            <Button
                onClick={() => {
                    signOut();
                }}
            >
                Вихід
            </Button>

            <AddUserModal
                open={openAddUserModal}
                onClose={() => setOpenAddUserModal(false)}
            />
        </div>
    );
};
