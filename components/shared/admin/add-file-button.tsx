"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { useParams } from "next/navigation";
import { AddFileModal } from "./add-file-modal";
import { FilePlus } from "lucide-react";

interface Props {
    className?: string;
}

export const AddFileButton: React.FC<Props> = ({ className }) => {
    const [openAddFileModal, setOpenAddFileModal] = React.useState(false);

    const params = useParams();
    const parentId =
        params.id.length > 1
            ? Number(params.id[params.id.length - 1])
            : undefined;

    return (
        <>
            <AddFileModal
                userId={Number(params.id[0])}
                parentId={parentId}
                open={openAddFileModal}
                onClose={() => setOpenAddFileModal(false)}
            />

            <Button
                variant="outline"
                onClick={() => setOpenAddFileModal(true)}
                className={cn("", className)}
            >
                <FilePlus />
            </Button>
        </>
    );
};
