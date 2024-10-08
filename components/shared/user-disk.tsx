"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderCard } from "./folder-card";
import { FileCard } from "./file-card";
import { Loader } from "lucide-react";
import { useUserDiskStore } from "@/store/user-disk";
import { Skeleton } from "../ui/skeleton";

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

    return (
        <div className="mt-5">
            <div
                className={cn(
                    "grid grid-cols-8 justify-items-center gap-5",
                    className
                )}
            >
                {loading ? (
                    [...Array(8)].map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-[100px] h-[100px] rounded-md"
                        />
                    ))
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
                            <a
                                key={file.id}
                                href={`http://localhost:8000/uploads/${file.name}`}
                                target="_blank"
                            >
                                <FileCard name={file.name} />
                            </a>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};
