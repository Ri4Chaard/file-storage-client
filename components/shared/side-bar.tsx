"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useUserDiskStore } from "@/store/user-disk";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { Folder } from "@/services/folders";
import Link from "next/link";

import { Disc } from "lucide-react";

interface Props {
    className?: string;
}

const FolderTree: React.FC<{ folder: Folder; parentPath: string }> = ({
    folder,
    parentPath,
}) => {
    const currentPath = `${parentPath}/${folder.id}`;

    return (
        <div className="pl-2 border-l border-primary/30">
            <Link href={currentPath}>
                <div className="py-1 pl-2 hover:bg-primary/20 rounded cursor-pointer transition-all">
                    {folder.name}
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
    console.log(session);

    return (
        <nav
            className={cn(
                "text-secondary-foreground p-3 flex flex-col justify-between",
                className
            )}
        >
            <div className="flex flex-col gap-8">
                <Link
                    href={`/user/${userId}`}
                    className="flex items-center gap-3 text-3xl"
                >
                    <h1 className="font-bold">iScan Disc</h1>
                    <Disc width={40} height={40} />
                </Link>
                <div>
                    <h3 className="mb-3 border-b">Ваші папки:</h3>
                    <Link href={`/user/${userId}`}>
                        <div className="py-1 pl-2 hover:bg-primary/20 rounded cursor-pointer transition-all">
                            <h4>Головна</h4>
                        </div>
                    </Link>
                    <h4></h4>
                    <div>
                        {folders.map((folder: Folder) => (
                            <FolderTree
                                key={folder.id}
                                folder={folder}
                                parentPath={`/user/${userId}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Button
                className="w-full mb-3"
                variant="outline"
                onClick={() => signOut()}
            >
                Вихід
            </Button>
        </nav>
    );
};
