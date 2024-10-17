import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Download, Eye, File, OctagonX } from "lucide-react";
import { useUserDiskStore } from "@/store/user-disk";
import { usePreviewStore } from "@/store/preview-store";
import { usePreviewFile } from "@/hooks/use-priview-file";
import { useUploadStore } from "@/store/upload-store";
import { downloadFile } from "@/lib/download-file";
import toast from "react-hot-toast";
import { FilePreviewModal } from "./file-preview-modal";
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

export const FileListItem: React.FC<Props> = ({
    id,
    name,
    size,
    createdAt,
    className,
}) => {
    const { deleteFile } = useUserDiskStore();

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
                "flex items-center justify-between relative rounded-lg border border-input overflow-hidden",
                className
            )}
        >
            <div
                className={
                    "absolute -z-0 h-full left-0 bg-blue-600 transition-all"
                }
                style={{ width: `${previewProgress}%` }}
            />
            <Button
                variant="outline"
                className="flex-1 flex items-center justify-between border-none rounded-none"
                disabled={previewProgress > 0 && previewProgress < 100}
                onClick={() => previewFile().then(togglePreview)}
            >
                <div className="flex items-center gap-5">
                    <File className="z-10" />
                    <p className="z-10">{name}</p>
                </div>
                <p className="z-10">{filesize(size)}</p>
                <p className="z-10">{format(createdAt, "yyyy-MM-dd HH:mm")}</p>
            </Button>

            <div className="flex items-center z-10">
                <Button
                    variant="outline"
                    className="border-none rounded-none"
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

                {useSession().data?.user.role === "ADMIN" && (
                    <Button
                        variant="destructive"
                        className="border-none rounded-none"
                        size="icon"
                        onClick={() => deleteFile(id)}
                    >
                        <OctagonX className="w-4 h-4" />
                    </Button>
                )}
            </div>

            <FilePreviewModal
                open={isCurrentPreview}
                onClose={() => setPreviewId(null)}
                previewUrl={previewUrl}
                fileName={name}
            />
        </div>
    );
};
