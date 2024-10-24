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
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useUserDiskStore } from "@/store/user-disk";
import { useUploadStore } from "@/store/upload-store";
import toast from "react-hot-toast";

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
    const [files, setFiles] = useState<File[]>([]);
    const { addFile } = useUserDiskStore();
    const { addUpload, removeUpload } = useUploadStore();

    const handleClose = () => {
        onClose();
        setFiles([]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert("Please select at least one file.");
            return;
        }

        files.forEach((file) => {
            const uploadId = `${file.name}-${Date.now()}`;
            addUpload(uploadId, `Завантаження файлу: ${file.name}`);

            const formData = new FormData();
            formData.append("userId", userId.toString());
            formData.append("folderId", parentId ? parentId.toString() : "");
            formData.append("files", file);

            addFile(formData, uploadId)
                .then(() => {
                    toast.success(`${file.name} успішно завантажено`);
                    removeUpload(uploadId);
                })
                .catch(() => {
                    toast.error(`Помилка завантаження ${file.name}`);
                    removeUpload(uploadId);
                });
        });

        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className={cn("sm:max-w-[425px]", className)}>
                <DialogHeader>
                    <DialogTitle>Завантаження файлу</DialogTitle>
                    <DialogDescription>
                        Оберіть файли для завантаження в обрану папку.
                    </DialogDescription>
                </DialogHeader>

                <Input type="file" multiple onChange={handleFileChange} />

                <DialogFooter>
                    <Button
                        onClick={handleUpload}
                        disabled={files.length === 0}
                    >
                        Завантажити
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
