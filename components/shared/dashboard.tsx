"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user-store";
import { UsersTable } from "./admin/users-table";
import { Header } from "./header";
import { BackButton } from "./back-button";

interface Props {
    className?: string;
}

export const Dashboard: React.FC<Props> = ({ className }) => {
    const { fetchUsers } = useUserStore();
    React.useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <div className={cn("", className)}>
            <BackButton className="mb-10" />
            <UsersTable />
        </div>
    );
};
