import React from "react";
import { cn } from "@/lib/utils";
import { Folder as IFolder } from "@/services/folders";
import { IFile } from "@/services/files";
import { File, Folder, FolderX } from "lucide-react";
import { Button } from "../ui/button";
import { FolderListItem } from "./folder-list-item";
import { FileListItem } from "./file-list-item";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";

interface Props {
    currentFolders: IFolder[];
    files: IFile[];
    loading: boolean;
    className?: string;
}

export const DiskListView: React.FC<Props> = ({
    currentFolders,
    files,
    loading,
    className,
}) => {
    if (useSession().status === "loading" || loading) {
        return (
            <div className={className}>
                <div className="flex flex-col gap-5">
                    {[...Array(8)].map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-full h-[40px] bg-primary/10"
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
            <div className="flex flex-col gap-5">
                {currentFolders.map((folder) => (
                    <FolderListItem
                        id={folder.id}
                        name={folder.name}
                        createdAt={folder.createdAt}
                    />
                ))}
                {files.map((file) => (
                    <FileListItem
                        id={file.id}
                        name={file.name}
                        size={file.size}
                        createdAt={file.createdAt}
                    />
                ))}
            </div>
        </div>
    );
};
