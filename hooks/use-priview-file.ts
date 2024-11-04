import { Api } from "@/services/api-client";
import { useUploadStore } from "@/store/upload-store";
import React from "react";

export const usePreviewFile = (fileName: string) => {
    const [previewUrl, setPreviewUrl] = React.useState("");
    const { addUpload, removeUpload, updateUpload } = useUploadStore.getState();

    const previewFile = async () => {
        const uploadId = fileName;
        addUpload(uploadId, "preview");

        try {
            const arrayBuffer = await Api.files.getFile(fileName, {
                withCredentials: true,
                onDownloadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total!) * 100
                    );
                    updateUpload(uploadId, progress);
                },
            });

            const blob = new Blob([arrayBuffer], {
                type: "application/octet-stream",
            });

            const streamUrl = window.URL.createObjectURL(blob);
            setPreviewUrl(streamUrl);

            removeUpload(uploadId);
            return () => {
                window.URL.revokeObjectURL(streamUrl);
            };
        } catch (error) {
            console.error("Error while loading file:", error);
            removeUpload(uploadId);
        }
    };

    return { previewUrl, previewFile };
};
