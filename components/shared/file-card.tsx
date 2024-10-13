import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { File, Eye, Download } from "lucide-react";
import { Button } from "../ui/button";
import { downloadFile } from "@/lib/download-file";
import toast from "react-hot-toast";
import { usePreviewFile } from "@/hooks/use-priview-file";
import { useUploadStore } from "@/store/upload-store";
import { usePreviewStore } from "@/store/preview-store";
import { FilePreviewModal } from "./file-preview-modal";

interface Props {
    name: string;
    fileUrl: string;
    className?: string;
}

export const FileCard: React.FC<Props> = ({ name, className }) => {
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

    return (
        <div
            className={cn(
                "w-[100px] h-[100px] flex flex-col items-center",
                className
            )}
        >
            <Button
                variant="outline"
                className="w-full h-full flex flex-col items-center justify-center gap-2"
            >
                <File />
                <p className="w-full text-xs overflow-hidden whitespace-pre-wrap break-words">
                    {name}
                </p>
            </Button>

            <div className="flex gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    disabled={previewProgress > 0 && previewProgress < 100}
                    onClick={() => previewFile().then(togglePreview)}
                >
                    <Eye className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                        downloadFile(name)
                            .then(() => {
                                toast.success(`${name} успішно завантажено`);
                            })
                            .catch(() => {
                                toast.error(`Помилка завантаження ${name}`);
                            })
                    }
                >
                    <Download className="w-4 h-4" />
                </Button>
            </div>

            {previewProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${previewProgress}%` }}
                    />
                </div>
            )}

            {/* {isCurrentPreview && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-4 rounded-md">
                        <button
                            onClick={() => setPreviewId(null)}
                            className="text-gray-600"
                        >
                            Close
                        </button>
                        {isVideo ? (
                            <video
                                controls
                                src={previewUrl}
                                className="max-w-full max-h-full"
                            />
                        ) : (
                            <img
                                src={previewUrl}
                                alt={name}
                                className="max-h-[800px]"
                            />
                        )}
                    </div>
                </div>
            )} */}
            <FilePreviewModal
                open={isCurrentPreview}
                onClose={() => setPreviewId(null)}
                previewUrl={previewUrl}
                fileName={name}
            />
        </div>
    );
};
