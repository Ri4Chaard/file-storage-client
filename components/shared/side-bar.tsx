"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useUserDiskStore } from "@/store/user-disk";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { Folder } from "@/services/folders";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

interface Props {
    className?: string;
}

const FolderTree: React.FC<{ folder: Folder; parentPath: string }> = ({
    folder,
    parentPath,
}) => {
    const currentPath = `${parentPath}/${folder.id}`;
    const { files } = useUserDiskStore();
    const currentFiles = files.filter((file) => file.folderId === folder.id);

    return (
        <div className="pl-2 border-l border-secondary/30">
            <Link href={currentPath}>
                <div className="py-1 pl-2 hover:bg-secondary/20 rounded cursor-pointer transition-all">
                    {currentFiles.length > 0
                        ? `${folder.name} (${currentFiles.length})`
                        : folder.name}
                </div>
            </Link>
            {folder.children && folder.children.length > 0 && (
                <div className="ml-2">
                    {folder.children.map((child: Folder) => (
                        <FolderTree
                            key={child.id}
                            folder={child}
                            parentPath={currentPath}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export const SideBar: React.FC<Props> = ({ className }) => {
    const { folders, userId } = useUserDiskStore();
    const { data: session } = useSession();

    return (
        <nav className={cn("bg-primary p-4", className)}>
            <Button
                className="w-full mb-3"
                variant="outline"
                onClick={() => signOut()}
            >
                Вихід
            </Button>
            {useSession().status === "loading" ? (
                <Skeleton className="w-full h-[40px]" />
            ) : (
                <Link href={`/user/${userId}`}>
                    <Button className="w-full border border-secondary">
                        {session?.user.email} | На головну
                    </Button>
                </Link>
            )}
            <div className="mt-4 text-white">
                {folders.map((folder: Folder) => (
                    <FolderTree
                        key={folder.id}
                        folder={folder}
                        parentPath={`/user/${userId}`}
                    />
                ))}
            </div>
        </nav>
    );
};
