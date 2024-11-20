"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user-store";
import { UsersTable } from "./admin/users-table";
import { Button } from "../ui/button";
import { AddUserModal } from "./admin/add-user-modal";
import { signOut } from "next-auth/react";

interface Props {
    className?: string;
}

export const Dashboard: React.FC<Props> = ({ className }) => {
    const { fetchUsers } = useUserStore();
    const [openAddUserModal, setOpenAddUserModal] = React.useState(false);

    React.useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <div className={cn("", className)}>
            <div className="flex items-center justify-between mb-5">
                <Button
                    onClick={() => setOpenAddUserModal(true)}
                    variant="outline"
                >
                    Додати користувача
                </Button>
                <Button
                    onClick={() => {
                        signOut();
                    }}
                >
                    Вихід
                </Button>
            </div>
            <UsersTable />

            <AddUserModal
                open={openAddUserModal}
                onClose={() => setOpenAddUserModal(false)}
            />
        </div>
    );
};
