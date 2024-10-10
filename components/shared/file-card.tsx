import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { File, Eye, Download } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
    name: string;
    fileUrl: string; // The URL of the file for download or preview
    isVideo?: boolean; // Whether the file is a video (add more types if needed)
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

    return (
        <div
            className={cn(
                "w-[100px] h-[100px] flex flex-col items-center",
                className
            )}
        >
            {/* File icon */}
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
                <a href={fileUrl} target="_blank">
                    <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                    </Button>
                </a>
            </div>

            {/* Preview Modal */}
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
