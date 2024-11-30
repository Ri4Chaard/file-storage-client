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

    const getFileType = (fileName: string) => {
        const extension = fileName.split(".").pop()?.toLowerCase();
        if (!extension) return "unknown";

        const videoExtensions = ["mp4", "avi", "mov", "mkv"];
        const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

        if (videoExtensions.includes(extension)) return "video";
        if (imageExtensions.includes(extension)) return "image";

        return "unknown";
    };

    const renderPreview = () => {
        const fileType = getFileType(fileName);

        switch (fileType) {
            case "video":
                return (
                    <video
                        controls
                        src={previewUrl}
                        className="w-full h-auto"
                    />
                );
            case "image":
                return (
                    <img
                        src={previewUrl}
                        alt={fileName}
                        className="w-full h-auto pointer-events-none"
                    />
                );

            default:
                return (
                    <p className="text-center">
                        Перегляд недоступний для такого типу файлу.
                    </p>
                );
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className={cn("sm:max-w-[600px]", className)}>
                <DialogHeader>
                    <DialogTitle>{fileName.substring(14)}</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center p-4">
                    {renderPreview()}
                </div>
                <DialogFooter />
            </DialogContent>
        </Dialog>
    );
};
