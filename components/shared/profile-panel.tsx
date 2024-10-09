"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

interface Props {
    className?: string;
}

export const ProfilePanel: React.FC<Props> = ({ className }) => {
    const { data: session } = useSession();

    return (
        <div className={cn("flex items-center", className)}>
            <span className="mr-3">
                {useSession().status === "loading" ? (
                    <Skeleton className="w-[140px] h-10 rounded-md" />
                ) : session?.user.role === "ADMIN" ? (
                    <Link className="" href={"/admin"}>
                        <Button className="border border-white">Admin</Button>
                    </Link>
                ) : (
                    <Link href={`/user/${session?.user.id}`}>
                        <Button className="border border-white">
                            {session?.user.email}
                        </Button>
                    </Link>
                )}
            </span>
            <Button
                variant="outline"
                className="self-end"
                onClick={() => {
                    signOut();
                }}
            >
                Вихід
            </Button>
        </div>
    );
};
