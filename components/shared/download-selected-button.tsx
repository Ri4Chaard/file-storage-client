"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useUserDiskStore } from "@/store/user-disk";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { downloadSelectedFiles } from "@/lib/download-selected-files";

interface Props {
    className?: string;
}

export const DownloadSelectedButton: React.FC<Props> = ({ className }) => {
    const { selectedFiles: selectedIds, unselectFile } = useUserDiskStore();

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Button onClick={downloadSelectedFiles}>
                {selectedIds.length === 0
                    ? "Завантажити всі файли"
                    : `Завантажити файли (${selectedIds.length})`}
            </Button>
            {selectedIds.length > 0 && (
                <button
                    className="hover:text-destructive transition-all"
                    onClick={() =>
                        selectedIds.forEach((id) => unselectFile(id))
                    }
                >
                    <X />
                </button>
            )}
        </div>
    );
};
