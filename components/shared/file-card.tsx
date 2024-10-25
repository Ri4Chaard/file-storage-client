import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { File, Eye, Download, OctagonX } from "lucide-react";
import { Button } from "../ui/button";
import { downloadFile } from "@/lib/download-file";
import toast from "react-hot-toast";
import { usePreviewFile } from "@/hooks/use-priview-file";
import { useUploadStore } from "@/store/upload-store";
import { usePreviewStore } from "@/store/preview-store";
import { FilePreviewModal } from "./file-preview-modal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useUserDiskStore } from "@/store/user-disk";
import { useSession } from "next-auth/react";
import { filesize } from "filesize";
import { format } from "date-fns";

interface Props {
    id: number;
    name: string;
    size: number;
    createdAt: Date;
    className?: string;
}

export const FileCard: React.FC<Props> = ({
    id,
    name,
    size,
    createdAt,
    className,
}) => {
    const { deleteFile, selectFile, unselectFile, selectedFiles } =
        useUserDiskStore();

    const { previewId, setPreviewId } = usePreviewStore();
    const isCurrentPreview = previewId === name;
    const togglePreview = () => {
        if (isCurrentPreview) {
            setPreviewId(null);
        } else {
            setPreviewId(name);
        }
    };

    const { previewUrl, previewFile } = usePreviewFile(name);
    const { uploads } = useUploadStore();

    const previewProgress =
        uploads.filter(
            (upload) => upload.message === "preview" && upload.id === name
        ).length > 0
            ? uploads.filter(
                  (upload) => upload.message === "preview" && upload.id === name
              )[0].progress
            : 0;

    const isSelected = selectedFiles.some(
        (selectedFileId) => selectedFileId === id
    );

    const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            selectFile(id);
        } else {
            unselectFile(id);
        }
    };

    return (
        <div
            className={cn(
                "relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] flex flex-col items-center",
                className
            )}
        >
            <input
                className="absolute right-1 top-1 w-5 h-5 z-20 rounded-full"
                type="checkbox"
                checked={isSelected}
                onChange={handleSelect}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full h-full overflow-hidden flex flex-col items-center justify-center gap-2 relative"
                    >
                        <File className="z-10" />
                        <p className="w-full z-10 text-xs sm:text-sm overflow-hidden text-center whitespace-pre-wrap break-words">
                            {name.substring(14)}
                        </p>
                        <div
                            className={
                                "absolute -z-0 w-full bottom-0 bg-blue-600 transition-all"
                            }
                            style={{ height: `${previewProgress}%` }}
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="text-center">
                        {name.substring(14)}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-center font-normal">
                        {filesize(size)}
                    </DropdownMenuLabel>
                    <DropdownMenuLabel className="text-center font-normal">
                        {format(createdAt, "yyyy-MM-dd HH:mm")}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Button
                            className="w-full flex"
                            variant="ghost"
                            size="icon"
                            disabled={
                                previewProgress > 0 && previewProgress < 100
                            }
                            onClick={() => previewFile().then(togglePreview)}
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            <p className="flex-1">Переглянути</p>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Button
                            className="w-full flex"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                downloadFile(name)
                                    .then(() => {
                                        toast.success(
                                            `${name} успішно завантажено`
                                        );
                                    })
                                    .catch(() => {
                                        toast.error(
                                            `Помилка завантаження ${name}`
                                        );
                                    })
                            }
                        >
                            <Download className="w-4 h-4 mr-2" />
                            <p className="flex-1">Завантажити</p>
                        </Button>
                    </DropdownMenuItem>

                    {useSession().data?.user.role === "ADMIN" && (
                        <DropdownMenuItem
                            className="focus:bg-destructive focus:text-destructive-foreground"
                            asChild
                        >
                            <Button
                                className="w-full flex"
                                variant="ghost"
                                onClick={() => deleteFile(id)}
                            >
                                <OctagonX className="w-4 h-4 mr-2" />
                                <p className="flex-1">Видалити файл</p>
                            </Button>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <FilePreviewModal
                open={isCurrentPreview}
                onClose={() => setPreviewId(null)}
                previewUrl={previewUrl}
                fileName={name}
            />
        </div>
    );
};
