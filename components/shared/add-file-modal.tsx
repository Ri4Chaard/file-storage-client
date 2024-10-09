"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Api } from "@/services/api-client";
import { useUserDiskStore } from "@/store/user-disk";

interface Props {
    userId: number;
    parentId: number | undefined;
    open: boolean;
    onClose: () => void;
    className?: string;
}

export const AddFileModal: React.FC<Props> = ({
    userId,
    parentId,
    open,
    onClose,
    className,
}) => {
    const [file, setFile] = useState<File | null>(null);

    const { addFile } = useUserDiskStore();

    const handleClose = () => {
        onClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId.toString());
        formData.append("folderId", parentId ? parentId.toString() : "");

        onClose();
        addFile(formData);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className={cn("sm:max-w-[425px]", className)}>
                <DialogHeader>
                    <DialogTitle>Завантаження файлу</DialogTitle>
                    <DialogDescription>
                        Оберіть файл для завантаження в обрану папку.
                    </DialogDescription>
                </DialogHeader>
                <Input type="file" onChange={handleFileChange} />
                <DialogFooter>
                    <Button onClick={handleUpload}>Завантажити</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
