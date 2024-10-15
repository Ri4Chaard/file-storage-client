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

interface Props {
    className?: string;
}

export const AdminPanel: React.FC<Props> = ({ className }) => {
    const [openAddUserModal, setOpenAddUserModal] = React.useState(false);

    const { users, loading, fetchUsers } = useUserStore();
    React.useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className={cn("flex flex-col gap-5 w-full", className)}>
            <div className="flex flex-col justify-center gap-3">
                {loading
                    ? [...Array(5)].map((_, index) => (
                          <Skeleton key={index} className="w-full h-[24px]" />
                      ))
                    : users.map((user) => (
                          <Link
                              href={`/user/${user.id}`}
                              key={user.id}
                              className="block bg-primary rounded-md text-white px-3"
                          >
                              {user.email}
                          </Link>
                      ))}
            </div>

            <AddUserModal
                open={openAddUserModal}
                onClose={() => setOpenAddUserModal(false)}
            />
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
        </div>
    );
};
