"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Folder as IFolder } from "@/services/folders";
import { Folder } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

interface Props {
    userId: number;
    parentId?: number;
    className?: string;
}

export const UserFolders: React.FC<Props> = ({
    userId,
    parentId,
    className,
}) => {
    const [folders, setFolders] = React.useState<IFolder[]>([]);
    const pathname = usePathname();

    React.useEffect(() => {
        const fetchFolders = async () => {
            try {
                const folders = await Api.folders.getFolders(userId, parentId);
                setFolders(folders);
            } catch (e) {
                console.log(e);
            }
        };
        fetchFolders();
    }, []);

    console.log(folders);

    return (
        <div className={cn("", className)}>
            {folders.map((folder) => (
                <Link
                    key={folder.id}
                    href={`${pathname}/${String(folder.id)}`}
                    className="w-[100px] h-[100px] border rounded-md flex flex-col items-center justify-center"
                >
                    <Folder />
                    <h2>{folder.name}</h2>
                </Link>
            ))}
        </div>
    );
};
