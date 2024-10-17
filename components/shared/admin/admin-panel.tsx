"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { AddUserModal } from "./add-user-modal";
import Link from "next/link";
import { useUsers } from "@/hooks/use-users";
import { Loader } from "lucide-react";
import { signOut } from "next-auth/react";
import { Skeleton } from "../../ui/skeleton";
import { useUserStore } from "@/store/user-store";
import { ShowUsersModal } from "./show-users-modal";

interface Props {
    className?: string;
}

export const AdminPanel: React.FC<Props> = ({ className }) => {
    const [openAddUserModal, setOpenAddUserModal] = React.useState(false);
    const [openShowUsersModal, setOpenShowUsersModal] = React.useState(false);

    const { fetchUsers } = useUserStore();
    React.useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className={cn("flex flex-col gap-5 w-full", className)}>
            <Button onClick={() => setOpenShowUsersModal(true)}>
                Переглянути користувачів
            </Button>
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

            <ShowUsersModal
                open={openShowUsersModal}
                onClose={() => setOpenShowUsersModal(false)}
            />
            <AddUserModal
                open={openAddUserModal}
                onClose={() => setOpenAddUserModal(false)}
            />
        </div>
    );
};
