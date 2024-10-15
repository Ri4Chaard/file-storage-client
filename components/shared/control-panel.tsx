import React from "react";
import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";
import { CreateFolderButton } from "./admin/create-folder-button";
import { AddFileButton } from "./admin/add-file-button";

interface Props {
    className?: string;
}

export const ControlPanel: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn("flex gap-5", className)}>
            <CreateFolderButton />
            <AddFileButton />
        </div>
    );
};
