import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { File, Eye, Download } from "lucide-react";
import { Button } from "../ui/button";
import { useUploadStore } from "@/store/upload-store";
import { downloadFile } from "@/lib/download-file";

interface Props {
    name: string;
    fileUrl: string;
    isVideo?: boolean;
    className?: string;
}

export const FileCard: React.FC<Props> = ({
    name,
    fileUrl,
    isVideo,
    className,
}) => {
    const [showPreview, setShowPreview] = useState(false);

    const togglePreview = () => setShowPreview((prev) => !prev);

    // Получаем прогресс загрузки из хранилища

    const downloadProgress = useUploadStore(
        (state) =>
            state.uploads.find((download) => download.id === name)?.progress ||
            0
    );

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
                <Button variant="ghost" size="icon" onClick={togglePreview}>
                    <Eye className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => downloadFile(name)}
                >
                    <Download className="w-4 h-4" />
                </Button>
            </div>

            {/* {downloadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${downloadProgress}%` }}
                    />
                </div>
            )} */}

            {showPreview && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-4 rounded-md">
                        <button
                            onClick={togglePreview}
                            className="text-gray-600"
                        >
                            Close
                        </button>
                        {isVideo ? (
                            <video
                                controls
                                src={fileUrl}
                                className="max-w-full max-h-full"
                            />
                        ) : (
                            <img
                                src={fileUrl}
                                alt={name}
                                className="max-h-[800px]"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
