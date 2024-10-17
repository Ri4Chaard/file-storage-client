"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { CreateFolderModal } from "./create-folder-modal";
import { useParams } from "next/navigation";
import { FolderPlus } from "lucide-react";

interface Props {
    className?: string;
}

export const CreateFolderButton: React.FC<Props> = ({ className }) => {
    const [openCreateFolderModal, setOpenCreateFolderModal] =
        React.useState(false);

    const params = useParams();
    const parentId =
        params.id.length > 1
            ? Number(params.id[params.id.length - 1])
            : undefined;

    return (
        <>
            <CreateFolderModal
                userId={Number(params.id[0])}
                parentId={parentId}
                open={openCreateFolderModal}
                onClose={() => setOpenCreateFolderModal(false)}
            />

            <Button
                onClick={() => setOpenCreateFolderModal(true)}
                className={cn("", className)}
            >
                <FolderPlus />
            </Button>
        </>
    );
};
