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
            const data = await Api.files.previewFile(fileName, {
                responseType: "blob",
                withCredentials: true,
                onDownloadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total!) * 100
                    );
                    updateUpload(uploadId, progress);
                },
            });
            setPreviewUrl(window.URL.createObjectURL(new Blob([data])));

            removeUpload(uploadId);
        } catch (error) {
            console.error("Ошибка при загрузке файла:", error);
            removeUpload(uploadId);
        }
    };
    return { previewUrl, previewFile };
};
