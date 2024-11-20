"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "../../ui/skeleton";
import { useUserDiskStore } from "@/store/user-disk";
import { useUserStore } from "@/store/user-store";
import { useParams } from "next/navigation";

interface Props {
    className?: string;
}

export const AdminProfilePanel: React.FC<Props> = ({ className }) => {
    const { users, loading, fetchUsers } = useUserStore();

    const { id } = useParams();

    React.useEffect(() => {
        fetchUsers(Number(id[0]));
    }, []);

    return (
        <div className={cn("flex items-center", className)}>
            <span className="mr-3">
                <div className="flex items-center gap-5">
                    {!loading && users.length > 0 ? (
                        <h2 className="text-secondary-foreground">
                            {users[0].phone}
                        </h2>
                    ) : (
                        <Skeleton className="w-[150px] h-6" />
                    )}
                    <Link className="" href="/admin-dashboard">
                        <Button className="border border-secondary">
                            Admin
                        </Button>
                    </Link>
                </div>
            </span>
        </div>
    );
};
