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
    const [file, setFile] = useState<File | null>(null);
    const { addFile } = useUserDiskStore();
    const { addUpload } = useUploadStore();

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

        const uploadId = Date.now().toString(); // Уникальный идентификатор загрузки
        addUpload(uploadId, `Завантаження файлу: ${file.name}`); // Добавьте загрузку

        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", userId.toString());
        formData.append("folderId", parentId ? parentId.toString() : "");

        onClose();

        toast.promise(addFile(formData, uploadId), {
            loading: "Файл завантажується",
            success: "Файл успішно завантажено",
            error: "Помилка завантаження файлу",
        });
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
                    <Button onClick={handleUpload} disabled={!file}>
                        Завантажити
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
