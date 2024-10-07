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

        try {
            await Api.files.uploadFile(formData);
            alert("File uploaded successfully!");
            handleClose();
        } catch (error) {
            console.error("File upload failed", error);
            alert("Failed to upload file.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className={cn("sm:max-w-[425px]", className)}>
                <DialogHeader>
                    <DialogTitle>Add file</DialogTitle>
                    <DialogDescription>
                        Choose a file to upload to the selected folder.
                    </DialogDescription>
                </DialogHeader>
                <Input type="file" onChange={handleFileChange} />
                <DialogFooter>
                    <Button onClick={handleUpload}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
