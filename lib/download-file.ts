import { Api } from "@/services/api-client";
import { useUploadStore } from "@/store/upload-store";

export const downloadFile = async (fileName: string) => {
    const uploadId = `${fileName}-${Date.now()}`;
    useUploadStore
        .getState()
        .addUpload(uploadId, `Завантаження файлу: ${fileName}`);
    try {
        const arrayBuffer = await Api.files.getFile(fileName, {
            withCredentials: true,
            onDownloadProgress: (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded / progressEvent.total!) * 100
                );
                useUploadStore.getState().updateUpload(uploadId, progress);
            },
        });

        const blob = new Blob([arrayBuffer], {
            type: "application/octet-stream",
        });

        const streamUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = streamUrl;
        link.setAttribute("download", fileName.substring(14));
        document.body.appendChild(link);
        link.click();
        link.parentNode!.removeChild(link);

        useUploadStore.getState().removeUpload(uploadId);
        return () => {
            window.URL.revokeObjectURL(streamUrl);
        };
    } catch (error) {
        console.error("Ошибка при скачивании файла:", error);
        useUploadStore.getState().removeUpload(uploadId);
    }
};
