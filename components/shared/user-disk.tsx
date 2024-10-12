"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderCard } from "./folder-card";
import { FileCard } from "./file-card";
import { FolderX } from "lucide-react";
import { useUserDiskStore } from "@/store/user-disk";
import { Skeleton } from "../ui/skeleton";
import { useSession } from "next-auth/react";

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
    const pathname = usePathname();

    const isVideoFile = (fileName: string) => {
        const videoExtensions = [".mp4", ".avi", ".mov", ".mkv"];
        return videoExtensions.some((ext) =>
            fileName.toLowerCase().endsWith(ext)
        );
    };

    if (useSession().status === "loading" || loading) {
        return (
            <div className="mt-5">
                <div
                    className={cn(
                        "grid grid-cols-8 justify-items-center gap-5",
                        className
                    )}
                >
                    {[...Array(8)].map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-[100px] h-[100px] rounded-md"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (files.length === 0 && folders.length === 0) {
        return (
            <div className="mt-10 text-gray-300">
                <div className="flex flex-col items-center justify-center gap-5">
                    <FolderX width={150} height={150} />
                </div>
                <h1 className="text-center font-bold text-xl">Папка пуста</h1>
            </div>
        );
    }

    return (
        <div className="mt-5">
            <div
                className={cn(
                    "grid grid-cols-8 justify-items-center gap-5",
                    className
                )}
            >
                {folders.map((folder) => (
                    <Link
                        key={folder.id}
                        href={`${pathname}/${String(folder.id)}`}
                    >
                        <FolderCard name={folder.name} />
                    </Link>
                ))}
                {files.map((file) => (
                    <FileCard
                        key={file.id}
                        name={file.name}
                        fileUrl={`http://localhost:8000/uploads/${file.name}`}
                        isVideo={isVideoFile(file.name)}
                    />
                ))}
            </div>
        </div>
    );
};
