"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CreateFolderModal } from "./create-folder-modal";
import { useParams } from "next/navigation";

interface Props {
    className?: string;
}

export const CreateFolderButton: React.FC<Props> = ({ className }) => {
    const [openCreateFolderModal, setOpenCreateFolderModal] =
        React.useState(false);

    const params = useParams();

    return (
        <>
            <CreateFolderModal
                userId={Number(params.id[0])}
                open={openCreateFolderModal}
                onClose={() => setOpenCreateFolderModal(false)}
            />

            <Button
                onClick={() => setOpenCreateFolderModal(true)}
                className={cn("", className)}
            >
                Create folder
            </Button>
        </>
    );
};
