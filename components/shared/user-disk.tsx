"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FolderCard } from "./folder-card";
import { FileCard } from "./file-card";
import { FolderX } from "lucide-react";
import { useUserDiskStore } from "@/store/user-disk";
import { Skeleton } from "../ui/skeleton";
import { useSession } from "next-auth/react";
import { findFolderById } from "@/lib/find-folder-by-id";

interface Props {
    userId: number;
    folderId?: number;
    className?: string;
}

export const UserDisk: React.FC<Props> = ({ userId, folderId, className }) => {
    const { fetchUserDisk, folders, files, loading } = useUserDiskStore();

    React.useEffect(() => {
        fetchUserDisk(userId, folderId);
    }, []);

    const currentFolders = folderId
        ? (() => {
              const folder = findFolderById(folders, Number(folderId));
              return folder ? folder.children : [];
          })()
        : folders;

    if (useSession().status === "loading" || loading) {
        return (
            <div className={className}>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5 justify-items-center">
                    {[...Array(8)].map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-primary/10"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (files.length === 0 && currentFolders.length === 0) {
        return (
            <div className={cn("bg-secondary", className)}>
                <div className="text-gray-300 h-1/2 flex flex-col items-center justify-center gap-5 ">
                    <FolderX width={150} height={150} />
                    <h1 className="text-center font-bold text-xl">
                        Папка пуста
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5 justify-items-center">
                {currentFolders.map((folder) => (
                    <FolderCard
                        key={folder.id}
                        id={folder.id}
                        name={folder.name}
                    />
                ))}
                {files.map((file) => (
                    <FileCard
                        key={file.id}
                        id={Number(file.id)}
                        name={file.name}
                    />
                ))}
            </div>
        </div>
    );
};
