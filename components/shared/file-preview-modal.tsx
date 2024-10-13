import React from "react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

interface Props {
    open: boolean;
    onClose: () => void;
    previewUrl: string;
    fileName: string;
    className?: string;
}

export const FilePreviewModal: React.FC<Props> = ({
    open,
    onClose,
    previewUrl,
    fileName,
    className,
}) => {
    const handleClose = () => {
        onClose();
    };

    const isVideoFile = (fileName: string) => {
        const videoExtensions = [".mp4", ".avi", ".mov", ".mkv"];
        return videoExtensions.some((ext) =>
            fileName.toLowerCase().endsWith(ext)
        );
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className={cn("sm:max-w-[425px]", className)}>
                <DialogHeader>
                    <DialogTitle>{fileName}</DialogTitle>
                </DialogHeader>
                {isVideoFile(fileName) ? (
                    <video controls src={previewUrl} />
                ) : (
                    <img src={previewUrl} alt={fileName} />
                )}
                <DialogFooter></DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
