"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";
import { Button } from "../ui/button";
import { findFolderById } from "@/lib/find-folder-by-id";
import { useUserDiskStore } from "@/store/user-disk";
import { LayoutGrid, List } from "lucide-react";
import { DiskViewControl } from "./disk-view-control";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";

interface Props {
    folderId?: number;
    className?: string;
}

export const Header: React.FC<Props> = ({ folderId, className }) => {
    const { folders } = useUserDiskStore();
    const { data: session } = useSession();

    const currentFolder = findFolderById(folders, Number(folderId));

    return (
        <div className={cn("p-3 flex items-center justify-between", className)}>
            <div className="flex items-center gap-3">
                {folderId && <BackButton />}
                <h2 className="font-bold flex items-center text-xl text-secondary-foreground h-[40px] gap-5">
                    {currentFolder ? currentFolder.name : "Головна"}
                    <span>//</span>
                    {useSession().status === "loading" ? (
                        <Skeleton className="w-[200px] h-[32px] bg-primary/10" />
                    ) : (
                        <span>{session?.user.phone}</span>
                    )}
                </h2>
            </div>

            <DiskViewControl />
        </div>
    );
};
