import { Api } from "@/services/api-client";
import { useUploadStore } from "@/store/upload-store";

export const downloadFile = async (fileName: string) => {
    const uploadId = `${fileName}-${Date.now()}`;
    useUploadStore
        .getState()
        .addUpload(uploadId, `Завантаження файлу: ${fileName}`);
    try {
        const data = await Api.files.downloadFile(fileName, {
            responseType: "blob",
            withCredentials: true,
            onDownloadProgress: (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded / progressEvent.total!) * 100
                );
                useUploadStore.getState().updateUpload(uploadId, progress);
            },
        });

        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode!.removeChild(link);

        useUploadStore.getState().removeUpload(uploadId);
    } catch (error) {
        console.error("Ошибка при скачивании файла:", error);
        useUploadStore.getState().removeUpload(uploadId);
    }
};
