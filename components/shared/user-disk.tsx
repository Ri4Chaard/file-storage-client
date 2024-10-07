"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useUserDisk } from "@/hooks/use-user-disk";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderCard } from "./folder-card";
import { FileCard } from "./file-card";
import { Loader } from "lucide-react";

interface Props {
    userId: number;
    folderId: number;
    className?: string;
}

export const UserDisk: React.FC<Props> = ({ userId, folderId, className }) => {
    const { folders, files, loading, handleUserDiskUpdate } = useUserDisk(
        userId,
        folderId
    );

    const pathname = usePathname();

    return (
        <div
            className={cn(
                "grid grid-cols-4 justify-items-center gap-5",
                className
            )}
        >
            {loading ? (
                <Loader className="animate-spin" />
            ) : (
                <>
                    {folders.map((folder) => (
                        <Link
                            key={folder.id}
                            href={`${pathname}/${String(folder.id)}`}
                        >
                            <FolderCard name={folder.name} />
                        </Link>
                    ))}
                    {files.map((file) => (
                        <FileCard name={file.name} />
                    ))}
                </>
            )}
        </div>
    );
};
