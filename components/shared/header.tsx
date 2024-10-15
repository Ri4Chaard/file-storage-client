"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";
import { Button } from "../ui/button";
import { findFolderById } from "@/lib/find-folder-by-id";
import { useUserDiskStore } from "@/store/user-disk";

interface Props {
    folderId?: number;
    className?: string;
}

export const Header: React.FC<Props> = ({ folderId, className }) => {
    const { folders } = useUserDiskStore();

    const currentFolder = findFolderById(folders, Number(folderId));

    return (
        <div
            className={cn("bg-primary p-3 flex items-center gap-3", className)}
        >
            {folderId && <BackButton />}
            <h2 className="font-bold flex items-center text-xl text-secondary h-[40px]">
                {currentFolder ? currentFolder.name : "Головна"}
            </h2>
        </div>
    );
};
