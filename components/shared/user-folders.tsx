"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Folder as IFolder } from "@/services/folders";
import { Folder } from "lucide-react";

interface Props {
    userId: number;
    className?: string;
}

export const UserFolders: React.FC<Props> = ({ userId, className }) => {
    const [folders, setFolders] = React.useState<IFolder[]>([]);

    React.useEffect(() => {
        const fetchFolders = async () => {
            try {
                const folders = await Api.folders.getFolders(userId);
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
                <div
                    key={folder.id}
                    className="w-[100px] h-[100px] border rounded-md flex flex-col items-center justify-center"
                >
                    <Folder />
                    <h2>{folder.name}</h2>
                </div>
            ))}
        </div>
    );
};
