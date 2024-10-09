"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";
import { CreateFolderButton } from "./create-folder-button";
import { AddFileButton } from "./add-file-button";
import { useSession } from "next-auth/react";

interface Props {
    className?: string;
}

export const ControlPanel: React.FC<Props> = ({ className }) => {
    const { data: session } = useSession();
    return (
        <div className={cn("flex gap-5", className)}>
            <BackButton />
            {session?.user.role === "ADMIN" && (
                <>
                    <CreateFolderButton />
                    <AddFileButton />
                </>
            )}
        </div>
    );
};
