"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { IFile } from "@/services/files";

interface Props {
    userId: number;
    parentId?: number;
    className?: string;
}

export const UserFiles: React.FC<Props> = ({ userId, parentId, className }) => {
    const [files, setFiles] = React.useState<IFile[]>([]);
    const pathname = usePathname();

    React.useEffect(() => {
        const fetchFolders = async () => {
            try {
                const files = await Api.files.getFiles(userId, parentId);
                setFiles(files);
            } catch (e) {
                console.log(e);
            }
        };
        fetchFolders();
    }, []);

    console.log(files);

    return <div className={cn("", className)}></div>;
};
